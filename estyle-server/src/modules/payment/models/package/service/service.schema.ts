import { Schema } from 'mongoose';

export const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

export interface IService {
  title: string;
  description?: string;
}
