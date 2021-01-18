import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VideoDto, VideoService } from 'services/estyleApi';

@Component({
  selector: 'app-video-channel',
  templateUrl: './video-channel.component.html',
  styleUrls: ['./video-channel.component.scss']
})
export class VideoChannelComponent implements OnInit {
  id: string;
  videos: VideoDto[];
  primary: VideoDto;
  page = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly channelService: VideoService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.videos = [];
      this.primary = undefined;
      if (this.id) {
        this.initSingleVideo();
        return;
      }
      this.initChannelPage();
    });
    if (this.id) {
      this.initSingleVideo();
      return;
    }
    this.initChannelPage();
  }

  private initSingleVideo() {
    this.initChannelPage(true);
    this.channelService.videoChannlControllerGetChannelVideoById(this.id)
    .pipe(
      catchError((err) => {
        return of(undefined);
      })
    )
    .subscribe((video) => {
      this.primary = video;
      // this.videos = videos.filter(vid => vid.id !== this.id);
      // this.primary = videos.find(vid => vid.id === this.id);
    });
  }

  private initChannelPage(withoutPrimary = false) {
    this.channelService.videoChannlControllerGetChannel()
      .pipe(
        catchError((err) => {
          return of(undefined);
        })
      )
      .subscribe((videos) => {
        this.videos = videos.filter(vid => !vid.isPrimary);
        if (withoutPrimary) {
          return;
        }
        this.primary = videos.find(vid => vid.isPrimary);
      });
  }
}
