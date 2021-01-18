import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneToOneSessionRoutingModule } from './one-to-one-session-routing.module';
import { OneToOneSessionComponent } from './one-to-one-session.component';
import {SharedModule} from "../../shared/shared.module";
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  declarations: [OneToOneSessionComponent, ContactFormComponent],
    imports: [
        CommonModule,
        OneToOneSessionRoutingModule,
        SharedModule
    ]
})
export class OneToOneSessionModule { }
