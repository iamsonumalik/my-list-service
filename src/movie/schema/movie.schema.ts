import { Schema, Document } from 'mongoose';
import { GenreEnum } from '../../common/constant';
import { MongooseModule } from '@nestjs/mongoose';

type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Romance'
  | 'SciFi';

export interface IMovie extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

export const MovieSchema = new Schema<IMovie>({
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
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]);
