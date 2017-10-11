import {Component, OnInit} from '@angular/core';
import {CommonService} from "./shared/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  enterSide: boolean;
  enterContent: boolean;
  isHome = true;
  menus = [
    {
      isHome: true,
      label: '首页',
      route: '/app/home'
    },
    {
      label: '俄罗斯方块',
      route: '/app/tetris'
    },
  ];
  constructor(private commonService: CommonService, private router: Router) {}
  ngOnInit() {
    this.commonService.isHomeEmit.subscribe(val => {
      this.isHome = val;
    });
  }
  routeTo(route) {
    this.router.navigate([route]);
  }
}
