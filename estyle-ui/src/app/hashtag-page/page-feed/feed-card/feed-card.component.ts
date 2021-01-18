import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../core/services/api/api.service";

@Component({
  selector: 'profile-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})

export class FeedCardComponent {

  constructor(
    private readonly router: Router,
  ) {
  }

}

