import { Document, Schema } from 'mongoose';
import { VideoPrivacy } from './video-privacy.enum';

export const VideoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  privacy: {
    type: String,
    enum: Object.keys(VideoPrivacy)
      .filter(k => typeof VideoPrivacy[k as any] === 'string')
      .map(k => VideoPrivacy[k as any]),
    default: VideoPrivacy.PRIVATE,
  },
  transcript: {
    type: String,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    index: true,
    default: Date.now,
  },
  isPrimary: {
    type: Boolean,
    index: true,
    default: false,
  },
  isArchived: {
    type: Boolean,
    index: true,
    default: false,
  },
});

export interface IVideo extends Document {
  url: string;
  thumbnail: string;
  title: string;
  description?: string;
  privacy: VideoPrivacy;
  transcript?: string;
  createdOn: string;
  updatedOn: string;
  isPrimary: boolean;
  isArchived: boolean;
}
