import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-outfit-page',
  templateUrl: './outfit-page.component.html',
  styleUrls: ['./outfit-page.component.scss']
})

export class OutfitPageComponent implements OnInit {

  id: string;
  name: string;
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => this.id=params['id']);
  }

  ngOnInit(): void {
  }

}
