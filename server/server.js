const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')

const PUBLIC_PATH = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(PUBLIC_PATH))

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('disconnect', () => {
    console.log('disconnect from server')
  })

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  )

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'new user joined')
  )

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage:', message)
    io.emit(
      'newMessage',
      generateMessage(message.from, message.text)
    )
    typeof callback === 'function' && callback('this is from the server')
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
  })
})


server.listen(PORT, () => {
  console.log(`Chat App is running on port ${PORT}`)
})
