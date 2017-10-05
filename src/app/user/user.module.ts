import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {RouterModule} from "@angular/router";
@NgModule({
  imports: [RouterModule.forChild([{path: '', component: UserComponent}])],
  declarations: [UserComponent],
})
export class UserModule {
}
