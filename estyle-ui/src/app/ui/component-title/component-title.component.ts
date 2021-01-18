import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'component-title',
  templateUrl: './component-title.component.html',
  styleUrls: ['./component-title.component.scss'],
})
export class ComponentTitleComponent {
  @Input() title: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}
}
