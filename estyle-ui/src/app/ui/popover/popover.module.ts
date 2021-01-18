import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';


@NgModule({
  declarations: [PopoverComponent, PopoverDirective],
  exports: [
    PopoverDirective,
    PopoverComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PopoverModule { }
