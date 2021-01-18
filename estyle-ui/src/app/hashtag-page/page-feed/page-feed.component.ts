import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { SearchInApiService } from 'src/app/ui/search-panel/search-in-api.service';
import { ApiService } from '../../core/services/api/api.service';
import { ToastrService } from 'ngx-toastr';

enum UserTypes {
  'User' = 'User',
  'Brand' = 'Brand',
}

@Component({
  selector: 'app-profile-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss'],
})
export class PageFeedComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private occasion: SearchInApiService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }
}
