const socket = io()
socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('New Email: ', data)
  const li = $('<li></li>')
  li.text(`${data.from}: ${data.text}`)
  $('#messages').append(li)
})

socket.emit('createMessage', {
  from: 'Hoss',
  text: 'hi there'
}, (ackData) => {
  console.log('Got Acknowledgment', ackData)
})

socket.on('newLocationMessage', (message) => {
  var li = $('<li></li>')
  var a = $('<a target="_blank">My current location</a>')
  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a);
  $('#messages').append(li)
})

$('#message-form').on('submit', (e) => {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, () => {
    $('[name=message]').val('')

  })
})

var locationBtn = $('#send-location')
locationBtn.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
    console.log(position)
  }, function() {
    alert('Unable to fetch location')
  })
})
