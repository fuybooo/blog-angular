import {Component, OnInit} from '@angular/core';
declare let io: any;

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
})
export class HomeChatComponent implements OnInit {
  inputValue;
  messages: any[] = [];
  socket = io('ws://localhost:3000/');
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
