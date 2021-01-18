import {VimeoService} from '../services/vimeo.service';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../dtos/video.dto';
import { VideoPostDto } from '../dtos/video-post.dto';
import { VideoPatchDto } from '../dtos/video-patch.dto';

@ApiTags('Video')
@ApiBearerAuth()
@Controller('video-channel')
export class VideoChannlController {
  constructor(
    private readonly service: VideoService,
    private readonly vimeoService: VimeoService,
  ) {}

  @ApiOkResponse({
    type: VideoDto,
    isArray: true,
  })
  @Get()
  async getChannel(): Promise<VideoDto[]> {
    const [videos, primary] = await Promise.all([
      this.service.find(
        { isPrimary: false },
        undefined,
        { updatedOn: -1 },
        9,
        0,
      ),
      this.service.find({ isPrimary: true }, undefined, undefined, 1, 0),
    ]);
    const res = [...videos];
    if (primary[0]) {
      res.unshift(primary[0]);
    }
    return res;
  }

  @ApiCreatedResponse({
    type: VideoPostDto,
  })
  @Post()
  async createVideo(@Body() dto: VideoPostDto) {
    const split = dto.url.split('/');
    const id = split[split.length - 1];
    const vimeoVideo: any = await this.vimeoService.findById(id);
    const thumbnail = vimeoVideo.pictures.sizes.sort((a, b) => b.width - a.width)[0]?.link;
    dto.thumbnail = thumbnail;
    return this.service.create(dto);
  }

  @ApiOkResponse({
    type: VideoDto,
  })
  @Get(':id')
  async getChannelVideoById(@Param('id') id: string): Promise<VideoDto> {
    return this.service.findById(id);
  }

  @ApiCreatedResponse({
    type: VideoPatchDto,
  })
  @Patch(':id')
  async updateVideo(@Param('id') id: string, @Body() dto: VideoPatchDto) {
    return this.service.update(id, dto);
  }

  // @Get()
  // async getVideos(
  //   @Query('limit') perPage: number = 6,
  //   @Query('page') page: number = 1,
  // ) {
  //   const found = await this.vimeoService.find(page, perPage);
  //   return found;
  // }
}
