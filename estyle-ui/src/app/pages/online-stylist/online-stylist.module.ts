import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineStylistRoutingModule } from './online-stylist-routing.module';
import { OnlineStylistComponent } from './online-stylist.component';
import {SharedModule} from "../../shared/shared.module";
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  declarations: [OnlineStylistComponent, ContactFormComponent],
    imports: [
        CommonModule,
        OnlineStylistRoutingModule,
        SharedModule
    ]
})
export class OnlineStylistModule { }
