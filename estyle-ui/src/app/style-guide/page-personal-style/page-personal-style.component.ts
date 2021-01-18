import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-personal-style',
  templateUrl: './page-personal-style.component.html',
  styleUrls: ['./page-personal-style.component.scss']
})
export class PagePersonalStyleComponent implements OnInit {
  @Input() title;
  @Input() description;
  @Input() recommendations;
  constructor() { }

  ngOnInit(): void {
  }

}
