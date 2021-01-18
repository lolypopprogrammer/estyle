import { Schema, Types, Document } from 'mongoose';

export const ForgotSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export interface IForgot extends Document {
  user: Types.ObjectId;
  token: string;
  createdOn: string;
}
