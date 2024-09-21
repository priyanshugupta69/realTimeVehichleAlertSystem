import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import generateRandomVehicleData from './genrators/carData';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.send('Socket.IO Server is running!');
});


io.on('connection', (socket) => {
  console.log('A user connected');

  const interval = setInterval(() => {
    const randomData = generateRandomVehicleData();
    socket.emit('vehicleData', randomData);
  }, 5000); 

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clearInterval(interval); 
  });
});

// Start the server
const PORT = process.env.PORT || 888;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






