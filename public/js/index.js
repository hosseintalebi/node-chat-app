var socket = io()
socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = $('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`)
  $('#messages').append(li)
})

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = $('<li></li>')
  var a = $('<a target="_blank">My current location</a>')
  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a);
  $('#messages').append(li)
})

$('#message-form').on('submit', (e) => {
  e.preventDefault()
  var messageTextBox =  $('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('')
  })
})

var locationBtn = $('#send-location')
locationBtn.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  locationBtn.attr('disabled', 'disabled').text('Sending location...')
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
    locationBtn.removeAttr('disabled').text('Send location')
  }, function() {
    alert('Unable to fetch location')
    locationBtn.removeAttr('disabled').text('Send location')
  })
})
