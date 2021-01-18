import {Component, HostListener, OnInit, SimpleChange} from '@angular/core';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import {ApiService} from '../../core/services/api/api.service';
import {ToastrService} from 'ngx-toastr';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  url: string;
  background: string = 'transparent';
  isAuthorized: boolean;
  authorThumbnail: string | ArrayBuffer = 'assets/images/ai.png';

  get isBgPink(): boolean {
    return ['/price-list', '/video-channel', '/one-to-one-session', '/virtual-wardrobe'].includes(this.url) || this.url === '/';
  }

  constructor(
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/virtual-wardrobe' || event.url === '/') {
          this.background = 'rgba(255, 130, 184, 0.45)';
        } else {
          this.background = 'transparent';
        }
      }
    });
  }

  navigateMyProfile() {
    this.router.navigate([`/profile-page/${this.api.currenUser.id}`]);
  }

  ngOnInit(): void {
    this.isAuthorized = this.api.isAuthorized();

    this.getThumbnail();

    this.url = this.router.url;

    this.router.events
      .pipe(
        filter(e => e instanceof RouterEvent)
      )
      .subscribe((e: RouterEvent) =>
        this.url = e.url
      );
  }

  ngDoCheck(): void {
    this.isAuthorized = this.api.isAuthorized();
  }

  logout(): void {
    this.api.unSetUser();
    this.isAuthorized = this.api.isAuthorized();
    this.router.navigate(['/']);
  }

  private getThumbnail() {
    this.api.getMe().subscribe((userData: any) => {
      this.authorThumbnail = userData.thumbnailBrandData;
    });
  }
}
