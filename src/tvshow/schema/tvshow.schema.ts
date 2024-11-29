import mongoose, { Schema, model, Document } from 'mongoose';
import { Genre, GenreEnum } from '../../common/constant';
import { MongooseModule } from '@nestjs/mongoose';

export interface Episode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

export interface ITVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  episodes: Episode[];
}

const EpisodeSchema = new Schema<Episode>({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

export const TVShowSchema = new Schema<ITVShow>({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    type: [String],
    enum: GenreEnum,
    required: true,
  },
  episodes: { type: [EpisodeSchema], required: true },
});

MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]);
