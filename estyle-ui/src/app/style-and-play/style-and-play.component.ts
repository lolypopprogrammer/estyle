import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-style-and-play',
  templateUrl: './style-and-play.component.html',
  styleUrls: ['./style-and-play.component.scss']
})

export class StyleAndPlayComponent implements OnInit {
  // data$: Observable<any[]> = of(DATA);

  constructor() {
  }

  ngOnInit(): void {
  }

}
