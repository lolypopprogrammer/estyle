import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarBottomComponent } from './toolbar-bottom.component';


@NgModule({
  declarations: [ToolbarBottomComponent],
  exports: [
    ToolbarBottomComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ToolbarBottomModule { }
