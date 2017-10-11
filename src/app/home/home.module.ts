import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {HomeChatComponent} from "./home-chat.component";
import {HomeTetrisComponent} from "./home-tetris.component";
import {HomeTetrisBlockComponent} from "./home-tetris-block.component";
import {HomeTetrisService} from "./home-tetris.service";
import {HomeTetrisBlockNextComponent} from "./home-tetris-block-next.component";
import {HomeTetrisBlockRemoteComponent} from "./home-tetris-block-remote.component";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  declarations: [
    HomeComponent,
    HomeChatComponent,
    HomeTetrisComponent,
    HomeTetrisBlockComponent,
    HomeTetrisBlockRemoteComponent,
    HomeTetrisBlockNextComponent
  ],
  providers: [
    HomeTetrisService
  ]
})
export class HomeModule {
}
