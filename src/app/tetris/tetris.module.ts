import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {TetrisComponent} from "./tetris.component";
import {TetrisBlockComponent} from "./tetris-block.component";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: TetrisComponent}])
  ],
  declarations: [
    TetrisComponent,
    TetrisBlockComponent
  ],
})
export class TetrisModule {
}
