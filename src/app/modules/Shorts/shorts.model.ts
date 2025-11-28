import { Schema, model } from 'mongoose';
import { IShort } from './shorts.interface';

const shortSchema = new Schema<IShort>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const Short = model<IShort>('Short', shortSchema);
