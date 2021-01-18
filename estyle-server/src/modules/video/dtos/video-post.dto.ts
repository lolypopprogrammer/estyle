import { PickType } from '@nestjs/swagger';
import { Video } from '../models/video/video.model';

export class VideoPostDto extends PickType(
  Video,
  ['url', 'thumbnail', 'title', 'description', 'privacy', 'transcript'],
) {}
