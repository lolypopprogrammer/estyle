import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Output() selectGroup = new EventEmitter();

  @Input() activeGroup: number;
  @Input() size: number;

  get prevDisabled(): boolean {
    return this.activeGroup === 0;
  }

  get nextDisabled(): boolean {
    return this.activeGroup === this.size - 1;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onPrevClick(evt): void {
    if (this.activeGroup === 0) {
      return;
    }

    const group = this.activeGroup - 1;

    this.selectGroup.emit(group);
  }

  onNextClick(evt): void {
    if (this.activeGroup === this.size - 1) {
      return;
    }

    const group = this.activeGroup + 1;

    this.selectGroup.emit(group);
  }

  finish(): void {
  }

}
