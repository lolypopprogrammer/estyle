import {RouterModule, Routes} from "@angular/router";
import {HashtagPageComponent} from "./hashtag-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: HashtagPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HashtagPageRoutingModule {  }
