import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [slideInDownAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  inputValue;
  constructor() { }

  ngOnInit() {
    this.doWebSocket();
  }

  send(value) {
    console.log(`输入：${value}`);
  }
  doWebSocket() {
    let webSocket = new WebSocket('ws://localhost:8001/');
    webSocket.onopen = () => {
      console.log('webscoket open');
    };
    webSocket.onclose = () => {
      console.log('webscoket close');
    };
    webSocket.onmessage = (e) => {
      console.log(`webscoket message: ${e.data}`);
    };
  }
}
