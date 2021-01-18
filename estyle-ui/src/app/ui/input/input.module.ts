import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIInputComponent } from './input.component';

@NgModule({
  declarations: [UIInputComponent],
  exports: [UIInputComponent],
  imports: [CommonModule],
})
export class UiInputModule {}
