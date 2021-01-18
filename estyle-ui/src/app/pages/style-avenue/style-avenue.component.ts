import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../app/core/services/current-user/current-user.service';

@Component({
  selector: 'app-style-avenue',
  templateUrl: './style-avenue.component.html',
  styleUrls: ['./style-avenue.component.scss']
})
export class StyleAvenueComponent implements OnInit {
  quiz$ = this.currentUser.quiz$;
  user: string;

  constructor(
    private readonly currentUser: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.user = 'Lucia';
  }
}
