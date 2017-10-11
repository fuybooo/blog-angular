import {Routes} from "@angular/router";
import {HomeGuard} from "./shared/guard/home-guard.service";
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/home'
  },
  {
    path: 'app/home',
    canActivate: [HomeGuard],
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'app/user',
    canActivate: [HomeGuard],
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: 'app/tetris',
    canActivate: [HomeGuard],
    loadChildren: 'app/tetris/tetris.module#TetrisModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/app/home'
  }
];
