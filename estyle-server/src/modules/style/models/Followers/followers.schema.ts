import { Schema, Document, Types } from 'mongoose';

const FollowersSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
    },
    subId: {
        type: String,
        ref: 'User',
        required: 'Sub is required',
    }
});

FollowersSchema.index({userId: 1, subId: 1}, {unique: true});

export  {FollowersSchema};

export interface FollowersInterface extends Document {
    userId: String;
    subId: String;
}