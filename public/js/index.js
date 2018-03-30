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

$('#message-form').on('submit', (e) => {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, () => {
    $('[name=message]').val('')

  })
})
