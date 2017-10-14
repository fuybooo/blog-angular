import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {TetrisComponent} from "./tetris.component";
import {TetrisBlockComponent} from "./tetris-block.component";
import {TetrisService} from "./tetris.service";
import {CommonModule} from "@angular/common";
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: TetrisComponent}])
  ],
  providers: [TetrisService],
  declarations: [
    TetrisComponent,
    TetrisBlockComponent
  ],
})
export class TetrisModule {
}
