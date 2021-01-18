import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';

export interface VideoInterface {
  image: string;
  name: string;
  created_time: BigInteger;
  duration: number;
  link: string;
  comments: number;
  likes: number;
  authorThumbnail: string;
  description: string;
  author: string;
  authorLink: string;
  playerLink: string;
}

@Component({
  selector: 'app-page-videos',
  templateUrl: './page-videos.component.html',
  styleUrls: [
    '../page-feed/page-feed.component.scss',
    './page-videos.component.scss',
  ],
})
export class PageVideosComponent implements OnInit {
  videos: Array<VideoInterface> = [];
  totalPage: number;
  currentPage: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.getVideos().subscribe((parsedData) => {
      this.totalPage = parsedData['total'];
      this.loadNextVideos();
    });
  }

  addVideosToList(video) {
    this.videos.push(...video);
  }

  loadNextVideos() {
    this.api.getVideos(this.currentPage).subscribe((parsedData) => {
      const videos = parsedData['data'];
      if (!videos) {
        throw new Error('Required field "data" for video list not found');
      }

      if (Array.isArray(videos) && videos.length > 0) {
        this.addVideosToList(videos);
      }
    });
  }

  loadMoreFeeds(): void {
    this.currentPage++;

    this.loadNextVideos();
  }

  trackByFn(index, item) {
    return index;
  }
}
