import {Component, OnInit} from '@angular/core';
import {CommonService} from "./shared/common.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  enterSide: boolean;
  enterContent: boolean;
  isHome = true;
  constructor(private commonService: CommonService) {}
  ngOnInit() {
    this.commonService.isHomeEmit.subscribe(val => {
      this.isHome = val;
    });
  }
}
