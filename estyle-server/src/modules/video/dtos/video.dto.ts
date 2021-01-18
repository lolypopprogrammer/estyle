import { OmitType, PickType } from '@nestjs/swagger';
import { Video } from '../models/video/video.model';

export class VideoDto extends OmitType(Video, ['isArchived', 'update', 'toJson', 'toDocument']) {}
