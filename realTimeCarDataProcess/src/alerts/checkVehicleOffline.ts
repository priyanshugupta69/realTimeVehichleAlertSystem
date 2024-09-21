import { offline_threshold } from "../config";
export default function(lastReceivedTime: number): boolean{
    const currentTime = Date.now();
    if (currentTime - lastReceivedTime > Number(offline_threshold)) {
        console.log('No vehicle data received for 20 minutes. Sending alert...');
        return false
    }
    else return true
};