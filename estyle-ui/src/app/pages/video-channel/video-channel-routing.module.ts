import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoChannelComponent } from "./video-channel.component";


const routes: Routes = [
  {
    path: '',
    component: VideoChannelComponent
  },
  {
    path: ':id',
    component: VideoChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoChannelRoutingModule { }
