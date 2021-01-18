import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SearchInApiService } from './search-in-api.service';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
})
export class SearchPanelComponent {
  occasions: any;
  current: any;
  bodyShapes: any;
  personalStyle: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private occasion: SearchInApiService
  ) {
    this.api.getOccasions().subscribe((data: any) => (this.occasions = data));
    this.api.getBodyShapes().subscribe((data: any) => (this.bodyShapes = data));
    this.api
      .getPersonalStyles()
      .subscribe((data: any) => (this.personalStyle = data));
    // this.occasion.onClick.subscribe((occasion) => {
    //   this.current = occasion;
    // });
  }

  public clickMe(id, state) {
    this.occasion.doClick(id, state);
  }

  public shapeUpdate(id, state): void {
    this.occasion.shapeUpdate(id, state);
  }

  public styleUpdate(id, state): void {
    this.occasion.styleUpdate(id, state);
  }
}
