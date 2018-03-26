const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

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

  socket.on('createMessage', (message) => {
    console.log('createMessage:', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    })
  })
})


server.listen(PORT, () => {
  console.log(`Chat App is running on port ${PORT}`)
})
