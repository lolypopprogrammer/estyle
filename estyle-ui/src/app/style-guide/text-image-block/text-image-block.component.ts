import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-image-block',
  templateUrl: './text-image-block.component.html',
  styleUrls: ['./text-image-block.component.scss']
})
export class TextImageBlockComponent implements OnInit {
  @Input() position = 'right';
  @Input() title: string;
  @Input() description: string;
  @Input() text: string;
  @Input() picture: string;

  constructor() { }

  ngOnInit(): void {
  }

}
