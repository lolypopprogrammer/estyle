import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { ClothesBuilderService } from '../clothes-builder.service';
import { IFeature } from '../types/feature';

const FEATURES = [
  {
    name: 'Text edit',
    icon: 'icon-font-size',
    action: 'createText',
    requireSelected: false
  },
/*  {
    name: 'Remove',
    icon: '',
    action: 'remove',
    requireSelected: true
  },*/
  {
    name: 'Rotate left',
    icon: 'icon-rotate-left',
    action: 'rotateLeft',
    requireSelected: true
  },
  {
    name: 'Rotate right',
    icon: 'icon-rotate-right',
    action: 'rotateRight',
    requireSelected: true
  },
  {
    name: 'Center',
    icon: 'icon-center-arrows',
    action: 'center',
    requireSelected: true
  }
];

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  features: IFeature[] = FEATURES;
  selected$ = this.clothesBuilderService.selected$;

  constructor(private toolbarService: ToolbarService, private clothesBuilderService: ClothesBuilderService) {
  }

  ngOnInit(): void {
  }

  select(feature): void {
    this.toolbarService.setEvent(feature);
  }
}
