import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TVShowSchema } from './schema/tvshow.schema';
import { TvshowController } from './tvshow.controller';
import { TvshowService } from './tvshow.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]),
  ],
  controllers: [TvshowController],
  providers: [TvshowService],
})
export class TVShowModule {}
