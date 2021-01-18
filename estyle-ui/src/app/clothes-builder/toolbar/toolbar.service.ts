import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  event$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  setEvent(selected: any): void {
    this.event$.emit(selected);
  }
}
