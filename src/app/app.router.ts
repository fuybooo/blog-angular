import {Routes} from "@angular/router";
import {SiderGuard} from "./shared/guard/sider-guard.service";
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/home'
  },
  {
    path: 'app/home',
    canActivate: [SiderGuard],
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'app/user',
    canActivate: [SiderGuard],
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: 'app/tetris',
    canActivate: [SiderGuard],
    loadChildren: 'app/tetris/tetris.module#TetrisModule'
  },
  {
    path: 'app/amap',
    canActivate: [SiderGuard],
    loadChildren: 'app/amap/amap.module#AmapModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/app/home'
  }
];
