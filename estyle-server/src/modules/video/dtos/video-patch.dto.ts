import { PartialType, PickType } from '@nestjs/swagger';
import { Video } from '../models/video/video.model';

export class VideoPatchDto extends PartialType(PickType(
  Video,
  ['url', 'thumbnail', 'title', 'description', 'privacy', 'transcript'],
)) {}
