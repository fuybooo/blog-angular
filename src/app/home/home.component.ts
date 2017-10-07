import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [slideInDownAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  constructor() { }

  ngOnInit() {
  }
}
