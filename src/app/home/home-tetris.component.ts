import {Component, EventEmitter, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
import {getRandom, Square, squareFactory} from "./home-tetris.model";
import {HomeTetrisService} from "./home-tetris.service";
declare let $: any;
@Component({
  selector: 'app-home-tetris',
  templateUrl: './home-tetris.component.html',
  animations: [slideInDownAnimation]
})
export class HomeTetrisComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  remoteData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  remoteNext;
  curType;
  curDirective;
  next;
  time = 0;
  remoteTime = 0;
  score = 0;
  remoteScore = 0;
  isGameOver;
  msg: string;
  constructor(private tetrisService: HomeTetrisService) {}
  ngOnInit() {
<<<<<<< HEAD
    this.setData();
    this.bindKeyEvent();
  }

  start($event) {
    $($event.target).blur();
    timer = setInterval(() => this.autoDown(), INTERVAL);
  }

  autoDown() {
    if (!this.move('down')) {
      this.setData(1);
      let line = this.checkClear();
      if (line) {
        this.addScore(line);
      }
      let gameOver = this.checkGameOver();
      if (gameOver) {
        this.stop();
        this.isGameOver = true;
      } else {
        this.preformNext();
      }
    }
    this.timeFunc();
  }

  addScore(line) {
    let score = 0;
    switch (line) {
      case 1:
        score = 10;
        break;
      case 2:
        score = 30;
        break;
      case 3:
        score = 60;
        break;
      case 4:
        score = 100;
        break;
    }
    this.score += score;
=======
>>>>>>> 97dfebeb7714b79925e79e0a965db1be7caebff2
  }
  generateSquare() {
    this.next = squareFactory();
  }
  changeNext($event) {
    if ($event) {
      this.next = squareFactory($event.type, $event.directive);
    } else {
      this.generateSquare();
    }
  }
  changeRemoteNext($event) {
    this.remoteNext = squareFactory($event.type, $event.directive);
  }
  changeTime($event) {
    this.time = $event;
  }
  changeScore($event) {
    this.score = $event;
  }
  changeGameOver() {
    this.isGameOver = true;
  }
  changeRemoteData($event) {
    this.remoteData = $event;
  }
  ready($event) {
    $($event.target).blur();
    this.isGameOver = false;
    this.tetrisService.commandEmitter.emit('ready');
  }
  doTry($event) {
    $($event.target).blur();
    this.isGameOver = false;
    this.tetrisService.commandEmitter.emit('try');
    this.generateSquare();
  }
}
