import { Schema, Document, Types } from 'mongoose';

export const CommentSchema = new Schema({
    content: {
        type: String,
        required: 'Content is requiured',
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: 'User is requiured',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

export interface CommentInterface extends Document {
    content: string;
    author: Types.ObjectId;
    createdOn: Date | string;
}
