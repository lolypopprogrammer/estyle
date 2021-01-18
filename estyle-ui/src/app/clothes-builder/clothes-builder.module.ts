import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClothesBuilderRoutingModule } from './clothes-builder-routing.module';
import { ClothesBuilderComponent } from './clothes-builder.component';
import { BrowseClothesModule } from './browse-clothes/browse-clothes.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { OperationsModule } from './operations/operations.module';
import { DndModule } from 'ngx-drag-drop';
import { ToolbarBottomModule } from './toolbar-bottom/toolbar-bottom.module';
import { UiSelectModule } from '../ui/select/select.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiInputModule } from '../ui/input/input.module';

@NgModule({
  declarations: [ClothesBuilderComponent],
  imports: [
    CommonModule,
    ClothesBuilderRoutingModule,
    BrowseClothesModule,
    ToolbarModule,
    OperationsModule,
    DndModule,
    ToolbarBottomModule,
    FormsModule,
    ReactiveFormsModule,
    UiSelectModule,
    UiInputModule,
    NgSelectModule,
  ],
})
export class ClothesBuilderModule {}
