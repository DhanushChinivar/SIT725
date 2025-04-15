const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('chat message', `${username} has joined the chat`);
  });

  socket.on('chat message', (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    io.emit('chat message', `${timestamp} | ${socket.username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('chat message', `${socket.username} has left the chat`);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
