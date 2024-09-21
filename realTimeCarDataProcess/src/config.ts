import dotenv from 'dotenv';
dotenv.config();

export const offline_threshold = process.env.OFFLINE_THRESHOLD || 1200000
export const dburl = process.env.DB_URL || 'mongodb://localhost:27017/vehicleData';