import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {AmapComponent} from "./amap.component";
import {AmapLineComponent} from "./amap-line.component";
import {AmapRangeComponent} from "./amap-range.component";
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AmapComponent, children: [
        {path: 'line', component: AmapLineComponent},
        {path: 'range', component: AmapRangeComponent},
      ]}
    ])
  ],
  declarations: [
    AmapComponent,
    AmapLineComponent,
    AmapRangeComponent
  ],
})
export class AmapModule {
}
