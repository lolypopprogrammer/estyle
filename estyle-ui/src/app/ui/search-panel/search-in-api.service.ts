import { EventEmitter } from '@angular/core';

export class SearchInApiService {
  private occasion: any;
  onClick: EventEmitter<any> = new EventEmitter();

  public doClick(occasionId: string, state: boolean) {
    this.onClick.emit({ occasionId, state });
  }
  public shapeUpdate(shapeId: string, state: boolean) {
    this.onClick.emit({ shapeId, state });
  }
  public styleUpdate(styleId: string, state: boolean) {
    this.onClick.emit({ styleId, state });
  }
}
