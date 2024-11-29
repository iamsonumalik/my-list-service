import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITVShow } from './schema/tvshow.schema';

@Injectable()
export class TvshowService {
  constructor(
    @InjectModel('TVShow') private readonly itvShowModel: Model<ITVShow>,
  ) {}

  getTVShows(): Promise<ITVShow[]> {
    return this.itvShowModel.find().exec();
  }
}
