import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {
  @Input() title: string;
  @Input() page: number;
  @Input() items;

  constructor() { }

  ngOnInit(): void {
  }

}
