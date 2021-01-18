import {VimeoService} from '../services/vimeo.service';
import {ApiTags} from '@nestjs/swagger';
import {Controller, Get, Param, Query} from '@nestjs/common';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(
    private vimeoService: VimeoService,
  ) {}

  @Get()
  async getVideos(
    @Query('limit') perPage: number = 6,
    @Query('page') page: number = 1,
  ) {
    const found = await this.vimeoService.find(page, perPage);
    return found;
  }
}
