import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
declare let io: any;

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  animations: [slideInDownAnimation]
})
export class HomeChatComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  inputValue;
  messages: any[] = [];
  socket = io('ws://localhost:8001/');
  constructor() { }

  ngOnInit() {
    this.onSocket();
  }

  send() {
    console.log('发送');
    if (this.inputValue) {
      this.socket.emit('message', this.inputValue);
      this.inputValue = '';
    }
  }
  onSocket() {
    let pushMessage = (data) => {
      this.messages.push(data);
    };
    this.socket.on('enter', pushMessage);
    this.socket.on('message', pushMessage);
    this.socket.on('leave', pushMessage);
  }
}
