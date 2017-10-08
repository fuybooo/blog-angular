import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {HomeChatComponent} from "./home-chat.component";
import {HomeTetrisComponent} from "./home-tetris.component";
import {HomeTetrisBlockComponent} from "./home-tetris-block.component";
import {HomeTetrisService} from "./home-tetris.service";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  declarations: [
    HomeComponent,
    HomeChatComponent,
    HomeTetrisComponent,
    HomeTetrisBlockComponent
  ],
  providers: [
    HomeTetrisService
  ]
})
export class HomeModule {
}
