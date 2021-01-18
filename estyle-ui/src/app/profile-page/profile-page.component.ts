import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/services/api/api.service';

enum UserTypes {
  'User' = 'User',
  'Brand' = 'Brand',
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  id: string;
  type: string;
  isSearched: boolean = false;
  isOwner: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    activateRoute.params.subscribe((params) => (this.id = params['id']));
  }

  ngOnInit(): void {
    if (!this.api.isAuthorized()) {
      this.router.navigate([`/`]);
    }

    this.api.getUserById(this.id).subscribe((data) => {
      this.type = data['type'];
      this.isOwner = this.api.currenUser['id'] === this.id;
    });
  }

  startSearching($event) {
    this.isSearched = $event;
  }
  isUser() {
    return this.type === UserTypes.User;
  }
  hiddenSearch() {
    this.isSearched ? (this.isSearched = false) : 0;
  }
}
