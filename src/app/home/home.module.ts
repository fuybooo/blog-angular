import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {SharedModule} from "../shared/shared.module";
import {HomeChatComponent} from "./home-chat.component";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  declarations: [
    HomeComponent,
    HomeChatComponent,
  ],
})
export class HomeModule {
}
