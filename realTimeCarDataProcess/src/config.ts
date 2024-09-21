import dotenv from 'dotenv';
dotenv.config();

export const offline_threshold = process.env.OFFLINE_THRESHOLD || 1200