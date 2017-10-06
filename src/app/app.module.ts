import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {routes} from "./app.router";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {CommonService} from "./shared/common.service";
import {HomeGuard} from "./shared/guard/home-guard.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot({extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont'}),
    RouterModule.forRoot(routes)
  ],
  providers: [CommonService, HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
