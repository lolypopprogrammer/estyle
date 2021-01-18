import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/services/api/api.service';

@Component({
  selector: 'app-hashtag-page',
  templateUrl: './hashtag-page.component.html',
  styleUrls: ['./hashtag-page.component.scss'],
})
export class HashtagPageComponent implements OnInit {
  name: string = '';
  
  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    activateRoute.params.subscribe((params) => (this.name = params['name']));
  }

  ngOnInit(): void {
  
  }
}
