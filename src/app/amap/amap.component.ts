import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html',
  animations: [slideInDownAnimation]
})
export class AmapComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
