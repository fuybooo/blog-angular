import {Routes} from "@angular/router";
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/home'
  },
  {
    path: 'app/home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'app/user',
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/app/home'
  }
];
