import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLeftMenuComponent } from './account-left-menu.component';


@NgModule({
  declarations: [AccountLeftMenuComponent],
  exports: [
    AccountLeftMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountLeftMenuModule { }
