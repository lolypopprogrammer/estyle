import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CheckboxGroupMultiplyComponent} from "@app/ui/controls/checkbox-group-multiply/checkbox-group-multiply.component";


@NgModule({
  declarations: [CheckboxGroupMultiplyComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CheckboxGroupMultiplyComponent]
})
export class CheckboxGroupMultiplyModule {
}
