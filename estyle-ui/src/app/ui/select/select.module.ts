import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UISelectComponent } from './select.component';

@NgModule({
  declarations: [UISelectComponent],
  exports: [UISelectComponent],
  imports: [CommonModule],
})
export class UiSelectModule {}
