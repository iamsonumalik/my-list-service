import { Schema, model, Document } from 'mongoose';
import { Genre, GenreEnum } from '../../common/constant';

interface WatchHistoryItem {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}

export interface User extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: WatchHistoryItem[];
}

const WatchHistorySchema = new Schema<WatchHistoryItem>({
  contentId: { type: String, required: true },
  watchedOn: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 5 },
});

export const UserSchema = new Schema<User>({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: {
      type: [String],
      enum: GenreEnum,
      required: true,
    },
    dislikedGenres: {
      type: [String],
      enum: GenreEnum,
      required: true,
    },
  },
  watchHistory: { type: [WatchHistorySchema], default: [] },
});
export const UserModel = model<User>('User', UserSchema, undefined, {
  overwriteModels: true,
});
