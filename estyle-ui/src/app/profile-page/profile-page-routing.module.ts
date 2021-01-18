import {RouterModule, Routes} from "@angular/router";
import {ProfilePageComponent} from "./profile-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfilePageRoutingModule {  }
