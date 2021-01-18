import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from './controls/checkbox/checkbox.module';
import { InputParamsComponent } from './controls/input-params/input-params.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [InputParamsComponent, BreadcrumbComponent],
    exports: [
        InputParamsComponent,
        BreadcrumbComponent
    ],
  imports: [
    CommonModule,
    CheckboxModule,
    NgSelectModule,
    FormsModule,
    RouterModule
  ]
})
export class UiModule { }
