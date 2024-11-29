import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovie } from './schema/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<IMovie>,
  ) {}

  async getMovies(): Promise<IMovie[]> {
    return this.movieModel.find().exec();
  }
}
