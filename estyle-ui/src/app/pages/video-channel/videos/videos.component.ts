import {Component, Input, OnInit} from '@angular/core';
import { VideoDto } from 'services/estyleApi';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @Input() videos: VideoDto[];
  @Input() gridClass: string;
  @Input() page: number;

  constructor() { }

  ngOnInit(): void {
  }

}
