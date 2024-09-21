import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { io as Client } from 'socket.io-client';
import checkDataTimeout from './alerts/checkVehicleOffline';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let lastReceivedTime = Date.now();


//connecting to websocket server for getting live vehicle data
const socket = Client('http://localhost:888'); 
socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});
let lastStoredBatteryPercentage = 100

socket.on('vehicleData', (data) => {
    const vehicleData: any = data;
    lastReceivedTime = Date.now();
    vehicleData.forEach((vehicle:any) => {
        lastStoredBatteryPercentage = vehicle.battery_percentage;
        if(vehicle.battery_percentage < 10){
            io.emit('batteryAlert', {message: 'Battery percentage is less than 10%', type: 'critical'} );
        }
    });
});
socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});
//..................



// setting up websocket server for sending alerts
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// checking for offline vehicles
setInterval(()=>{
    if(!checkDataTimeout(lastReceivedTime)){
        io.emit('offlineAlert', {message: 'No data recived from last 20 minutes..', type: 'critical'} );
    }
    if(!checkDataTimeout(lastReceivedTime) && lastStoredBatteryPercentage < 10){
        io.emit('deepOfflineAlert', {message: 'Deep discharege alert', type: 'critical'} );
    }
}, 1000);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


