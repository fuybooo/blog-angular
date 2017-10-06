import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
