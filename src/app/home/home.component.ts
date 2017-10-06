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
  webSocket = new WebSocket('ws://localhost:8001/');
  constructor() { }

  ngOnInit() {
    this.doWebSocket();
  }

  send(value) {
    console.log(`输入：${value}`);
    this.webSocket.send(value);
  }
  doWebSocket() {
    this.webSocket.onopen = () => {
      console.log('webscoket open');
    };
    this.webSocket.onclose = () => {
      console.log('webscoket close');
    };
    this.webSocket.onmessage = (e) => {
      console.log(`webscoket message: ${e.data}`);
    };
  }
}
