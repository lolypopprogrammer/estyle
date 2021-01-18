import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @ViewChild('iframe', { static: false}) iframe: ElementRef;
  @Input() videoUrl: string;
  @Input() previewUrl: string;
  @Input() externalLink: string;
  @Input() routerLink: any;
  @Input() order: number;
  @Input() title: string;
  @Input() isPrivate: boolean;
  showVideo: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private readonly router: Router,
  ) { }


  ngOnInit(): void {
    this.showVideo = !this.previewUrl;
  }

  handlePreviewClick() {
    if (this.routerLink) {
      this.router.navigateByUrl(this.isPrivate ? '/price-list' : this.routerLink);
      return;
    }
    this.showVideo = true;
    // console.log(this.iframe.nativeElement);
  }

  get url() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
