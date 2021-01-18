import { Schema, Document, Types } from 'mongoose';

export const WardrobeCalendarSchema = new Schema({
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: 'User is required',
    },
    outfit: {
        type: Types.ObjectId,
        ref: 'Outfit',
        required: 'Outfit is required',
    },
    date: {
        type: Date,
        default: Date.now,
        required: 'Date is required',
    },
});

export interface WardrobeCalendarInterface extends Document {
    outfit: Types.ObjectId;
    author: Types.ObjectId;
    date: Date;
}
