const socket = io()
socket.on('connect', () => {
  console.log('connected to server')
  socket.emit('createMessage', {
    from: 'Hoss',
    text: 'Hey there',
  })
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (data) => {
  console.log('New Email: ', data)
})