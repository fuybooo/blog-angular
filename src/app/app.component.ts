import {Component, OnInit} from '@angular/core';
import {CommonService} from "./shared/common.service";
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  enterSide: boolean;
  enterContent: boolean;
  isNoSider = true;
  submenus;
  placePath = [];
  menus: any[] = [
    {
      id: 1,
      isNoSider: true,
      label: '首页',
      route: '/app/home'
    },
    {
      id: 2,
      isNoSider: true,
      label: '俄罗斯方块',
      route: '/app/tetris'
    },
    {
      id: 3,
      label: '高德地图',
      route: '/app/amap',
      submenus: [
        {
          id: 4,
          parentId: 3,
          label: '高德地图-轨迹',
          route: '/app/amap/line',
        },
        {
          id: 5,
          parentId: 3,
          label: '高德地图-范围',
          route: '/app/amap/range'
        }
      ]
    },
  ];

  constructor(private commonService: CommonService,
              private router: Router,
              private title: Title) {
  }

  ngOnInit() {
    this.commonService.isNoSiderEmit.subscribe(val => {
      this.isNoSider = val;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let menu = this.getMenu(this.router.url);
        menu.active = true;
        this.setSubMenu(menu, this.router.url.match(/\//g).length === 3);
        this.title.setTitle(menu.label);
      }
    });
  }
  setSubMenu(menu, isSub = false) {
    this.placePath = [];
    if (isSub) {
      let parentMenu = this.getParent(menu);
      this.placePath.push(parentMenu.label);
      this.submenus = parentMenu.submenus;
    } else {
      this.submenus = menu.submenus;
    }
    this.placePath.push(menu.label);
  }

  routeTo(menu) {
    this.router.navigate([menu.route]);
  }

  private getParent(menu) {
    for (let m of this.menus) {
      if (m.id === menu.parentId) {
        return m;
      }
    }
  }

  /**
   * 干两件事情
   * 1. 找到匹配的路由
   * 2. 清除激活状态
   * @param route
   * @returns {any}
   */
  private getMenu(route) {
    let menu;
    for (let m of this.menus) {
      m.active = false;
      m.subActive = false;
      if (m.route === route) {
        menu = m;
      }
    }
    for (let m of this.menus) {
      if (m.submenus) {
        for (let sub of m.submenus) {
          sub.active = false;
          if (sub.route === route) {
            menu = sub;
            m.subActive = true;
          }
        }
      }
    }
    return menu;
  }
}
