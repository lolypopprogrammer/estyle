import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseClothesComponent } from './browse-clothes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { ClotheInfoComponent } from './clothe-info/clothe-info.component';
import { UiSelectModule } from 'src/app/ui/select/select.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [BrowseClothesComponent, ClotheInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    FormsModule,
    ReactiveFormsModule,
    UiSelectModule,
    NgSelectModule,
  ],
  exports: [BrowseClothesComponent, ClotheInfoComponent],
})
export class BrowseClothesModule {}
