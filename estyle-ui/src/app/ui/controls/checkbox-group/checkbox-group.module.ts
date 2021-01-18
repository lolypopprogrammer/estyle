import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from "@app/ui/controls/checkbox-group/checkbox-group.component";


@NgModule({
  declarations: [CheckboxGroupComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CheckboxGroupComponent]
})
export class CheckboxGroupModule { }
