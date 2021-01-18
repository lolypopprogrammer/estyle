import { EventEmitter } from '@angular/core';

export class OccasionService {
  private occasion: any;
  public previus: any;
  onClick: EventEmitter<any> = new EventEmitter();

  public doClick(occasionId: string) {
    this.previus = this.occasion;
    this.occasion = occasionId;
    this.onClick.emit(this.occasion);
  }
}
