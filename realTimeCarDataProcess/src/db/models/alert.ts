import mongoose, { Document, Schema } from 'mongoose';

interface IAlert extends Document {
    alert_type: string;
    vehicle_id: number;
    isOnline?: boolean;
    message?: string;
    battery?: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
    isCritical?: boolean;
}

// Define the Mongoose schema
const alertSchema: Schema<IAlert> = new mongoose.Schema({
    alert_type: {
        type: String,
        required: true
    },
    vehicle_id: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        default: "Your insurance expiring soon"
    },
    battery: {
        type: Number,
        default: undefined
    },
    status: {
        type: String,
        default: "resolved"
    },
    isOnline: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: String,
        default: new Date().toISOString().replace('T', ' ').replace('Z', '')
    },
    updated_at: {
        type: String,
        default: new Date().toISOString().replace('T', ' ').replace('Z', '')
    },
    isCritical: {
        type: Boolean,
        default: false
    }
});

const Alert = mongoose.model<IAlert>('Alert', alertSchema);

export default Alert;
export { IAlert };