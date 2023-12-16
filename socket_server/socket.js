// server.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your React app URL
    methods: ['GET', 'POST'],
  },
});

// Add middleware and routes as needed
app.use(cors());

// Handle socket connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle 'sendMessage' event
  socket.on('sendMessage', (data) => {
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', data);
  });

  socket.on('error',(error)=>{
    console.log(error)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
