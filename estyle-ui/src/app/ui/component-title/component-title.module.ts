import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentTitleComponent } from './component-title.component';

@NgModule({
  declarations: [ComponentTitleComponent],
  exports: [ComponentTitleComponent],
  imports: [CommonModule],
})
export class ComponentTitleModule {}
