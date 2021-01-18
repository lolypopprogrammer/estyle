import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StyleAvenueRoutingModule} from "./style-avenue-routing.module";
import { CurrentUserService } from 'src/app/core/services/current-user/current-user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StyleAvenueRoutingModule
  ]
})
export class StyleAvenueModule {
}
