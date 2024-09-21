import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { io as Client } from 'socket.io-client';
import checkDataTimeout from './alerts/checkVehicleOffline';
import {isLessThan30DaysFromNow} from './utils/dateCheckets';
import dbConnect from './db/dbconnect';
import { dburl } from './config';
import Alert from './db/models/alert';
import { IAlert } from './db/models/alert';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let lastReceivedTime = Date.now();

dbConnect(dburl);

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
        if(Number(vehicle.battery_percentage) < 10){
            const alert = { 
                alert_type: "Battery Low",
                vehicle_id: vehicle.id,
                battery: Number(vehicle.battery_percentage),
                message: "Battery is low",
                status: "resolved",
                isCritical: true,
            }
            io.emit('batteryAlert', alert );
        }
        const insuranceExpireDateString = vehicle.insurance_validity_date
        const insuranceExpireDate = new Date(insuranceExpireDateString);
        if(!isLessThan30DaysFromNow(insuranceExpireDate.getTime())){
            const alert = { 
                alert_type: "Insurance Expiry",
                vehicle_id: vehicle.id,
                message: "Your insurance exipring in less than 30 days",
                status: "resolved",
                isCritical: false,
            }
            io.emit('insuranceAlert', alert );
            Alert.create(alert).then((data) => {
                console.log('Insurance alert created');
            }).catch((err) => {
                console.log(err); 
            })
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
        const alert = {
            alert_type: "Offline",
            vehicle_id: -1,
            battery: lastStoredBatteryPercentage,
            message: "No data recived from last 20 minutes..",
            status: "resolved",
            isOnline: false,
            isCritical: true,
        }
        io.emit('offlineAlert', alert );
        Alert.create(alert).then((data) => {
            console.log('Offline alert created');
        }).catch((err) => {
            console.log(err); 
        })
    }
    if(!checkDataTimeout(lastReceivedTime) && lastStoredBatteryPercentage < 10){
        const alert = {
            alert_type: "Deepoffline",
            vehicle_id: -1,
            battery: lastStoredBatteryPercentage,
            message: "No data recived from last 20 minutes..",
            status: "resolved",
            isOnline: false,
            isCritical: true,
        }
        io.emit('deepOfflineAlert', alert );
    }
}, 1000);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


