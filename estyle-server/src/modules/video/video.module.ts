import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoChannlController } from './controllers/channel.controller';
import {VideoController} from './controllers/video.controller';
import { VideoSchema } from './models/video/video.schema';
import { VideoService } from './services/video.service';
import {VimeoService} from './services/vimeo.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
    ],
    controllers: [
        VideoController,
        VideoChannlController,
    ],
    providers: [
        VimeoService,
        VideoService,
    ],
})
export class VideoModule {
}
