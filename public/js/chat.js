var socket = io()

function scrollToBottom() {
  // selectors
  var messages = $('#messages')
  var newMessage = messages.children('li:last-child')

  // Height
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }

}

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
  var template = $('#message-template').html()
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  $('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = $('#location-message-template').html()
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })
  $('#messages').append(html)
  scrollToBottom()
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
