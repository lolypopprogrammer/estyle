import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageInfoComponent } from './page-info/page-info.component';
import { VideoComponent } from './video/video.component';
import { ResponsiveImageDirective } from './directives/responsive-image.directive';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [PageInfoComponent, VideoComponent, ResponsiveImageDirective],
    exports: [
        PageInfoComponent,
        VideoComponent,
        ResponsiveImageDirective
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule {
}
