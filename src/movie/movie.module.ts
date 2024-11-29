import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schema/movie.schema';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
