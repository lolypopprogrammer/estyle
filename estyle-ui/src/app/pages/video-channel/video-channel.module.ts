import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoChannelRoutingModule } from './video-channel-routing.module';
import { VideoChannelComponent } from './video-channel.component';
import {CheckboxModule} from "../../ui/controls/checkbox/checkbox.module";
import { VideosComponent } from './videos/videos.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [VideoChannelComponent, VideosComponent],
    imports: [
        CommonModule,
        VideoChannelRoutingModule,
        CheckboxModule,
        SharedModule
    ]
})
export class VideoChannelModule { }
