import { Schema, Document } from 'mongoose';
import { ShowType, ShowTypeEnum } from '../../common/constant';

export interface ListItem extends Document {
  userId: string;
  itemId: string;
  type: ShowType;
  addedAt: Date;
}

export const ListSchema = new Schema<ListItem>(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true, refPath: 'type' },
    type: { type: String, enum: ShowTypeEnum, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }, // Removes the __v field
);

// Optional: Add an index to improve query performance
ListSchema.index({ userId: 1, itemId: 1, type: 1 }, { unique: true });
