import { Component, OnInit } from '@angular/core';
import { IFeature } from '../types/feature';
import { ClothesBuilderService } from '../clothes-builder.service';
import { ToolbarBottomService } from './toolbar-bottom.service';

const FEATURES = [
  {
    name: 'Duplicate',
    icon: 'icon-copy',
    action: 'duplicate',
    requireSelected: true
  },
  {
    name: 'Center by horizontal',
    icon: 'icon-center-horizontal-arrow',
    action: 'centerByHorizontal',
    requireSelected: true
  },
  {
    name: 'Center by vertical',
    icon: 'icon-center-vertically-arrow',
    action: 'centerByVertical',
    requireSelected: true
  },
  {
    name: 'Move up',
    icon: 'icon-arrow-up',
    action: 'moveUp',
    requireSelected: true
  },
  {
    name: 'Move down',
    icon: 'icon-arrow-down',
    action: 'moveDown',
    requireSelected: true
  },
  {
    name: 'Remove',
    icon: 'icon-delete',
    action: 'remove',
    requireSelected: true
  }
];

@Component({
  selector: 'app-toolbar-bottom',
  templateUrl: './toolbar-bottom.component.html',
  styleUrls: ['./toolbar-bottom.component.scss']
})
export class ToolbarBottomComponent implements OnInit {
  features: IFeature[] = FEATURES;
  selected$ = this.clothesBuilderService.selected$;

  constructor(private toolbarBottomService: ToolbarBottomService, private clothesBuilderService: ClothesBuilderService) {
  }

  ngOnInit(): void {
  }

  select(feature): void {
    this.toolbarBottomService.setEvent(feature);
  }
}
