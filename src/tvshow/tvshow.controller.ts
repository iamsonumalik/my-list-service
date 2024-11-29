import { Controller, Get } from '@nestjs/common';
import { TvshowService } from './tvshow.service';

@Controller('tvshows')
export class TvshowController {
  constructor(private readonly tvshowService: TvshowService) {
  }

  @Get()
  async getTVShows() {
    return this.tvshowService.getTVShows();
  }
}
