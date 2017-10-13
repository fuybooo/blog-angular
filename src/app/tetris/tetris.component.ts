import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
import {Square, squareFactory} from "./tetris.model";
import {TetrisService} from "./tetris.service";
declare let $: any;
declare let io: any;
let timer = null;
let INTERVAL = 200;
let timeCount = 0;
@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  animations: [slideInDownAnimation]
})
export class TetrisComponent implements OnInit {
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
  next: Square;
  current: Square;
  time = 0;
  score = 0;
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
  remoteNext: Square;
  remoteCurrent: Square;
  remoteScore = 0;
  isGameOver = false;
  private socket;

  constructor(private tetrisService: TetrisService) {
    this.socket = io('ws://localhost:3000/');
  }

  ngOnInit() {
    this.bindSocketEvent();
    this.bindKeyEvent();
  }
  bindSocketEvent() {
    this.socket.on('next', data => {
      this.remoteNext = squareFactory(data.type, data.directive);
    });
    this.socket.on('current', data => {
      this.remoteCurrent = squareFactory(data.type, data.directive);
    });
    this.socket.on('start', () => {
      this.start();
    });
    this.socket.on('setData', (data) => {
      this.tetrisService.setData(this.remoteData, this.remoteCurrent, data);
    });
    this.socket.on('down', () => {
      this.tetrisService.move(this.remoteData, this.remoteCurrent, 'down');
    });
    this.socket.on('checkClear', () => {
      let line = this.tetrisService.checkClear(this.remoteData);
      if (line) {
        this.remoteScore += this.getScore(line);
        let addLine = this.getAddLine(line);
        if (addLine) {
          this.tetrisService.addTailLines(this.gameData, this.current, this.tetrisService.generateLines(addLine));
        }
      }
    });
    this.socket.on('checkGameOver', () => {
      let gameOver = this.tetrisService.checkGameOver(this.remoteData);
      if (gameOver) {
        this.stop();
        this.isGameOver = true;
      }
    });
    this.socket.on('preformNext', (data) => {
      this.tetrisService.preformNext(this.remoteData, this.remoteCurrent, this.remoteNext);
      this.remoteNext = squareFactory(data.type, data.directive);
    });
    this.socket.on('left', () => {
      this.tetrisService.move(this.remoteData, this.remoteCurrent, 'left');
    });
    this.socket.on('right', () => {
      this.tetrisService.move(this.remoteData, this.remoteCurrent, 'right');
    });
    this.socket.on('rotate', () => {
      this.tetrisService.rotate(this.remoteData, this.remoteCurrent);
    });
    this.socket.on('fall', () => {
      this.fall(this.remoteData, this.remoteCurrent);
    });
    this.socket.on('addLine', (data) => {
      this.tetrisService.addTailLines(this.remoteData, this.remoteCurrent, this.tetrisService.generateLines(data));
    });
    // this.socket.on('addLine', (data) => {
    //   this.tetrisService.addTailLines(this.gameData, this.current, this.tetrisService.generateLines(data));
    // });
  }

  start($event?) {
    if ($event) {
      $($event.target).blur();
    }

    this.next = squareFactory();
    this.current = squareFactory();
    this.socket.emit('next', {type: this.next.type, directive: this.next.directive});
    this.socket.emit('current', {type: this.current.type, directive: this.current.directive});
    this.tetrisService.setData(this.gameData, this.current);
    this.socket.emit('setData');

    timer = setInterval(() => this.autoDown(), INTERVAL);
  }

  ready($event) {
    $($event.target).blur();
    this.socket.emit('ready');
  }

  autoDown() {
    if (!this.tetrisService.move(this.gameData, this.current, 'down')) {
      this.tetrisService.setData(this.gameData, this.current, 1);
      this.socket.emit('setData', 1);
      let line = this.tetrisService.checkClear(this.gameData);
      this.socket.emit('checkClear');
      if (line) {
        this.score += this.getScore(line);
        let addLine = this.getAddLine(line);
        if (addLine) {
          this.socket.emit('addLine', addLine);
        }
      }
      let gameOver = this.tetrisService.checkGameOver(this.gameData);
      this.socket.emit('checkGameOver');
      if (gameOver) {
        this.stop();
        this.isGameOver = true;
      } else {
        this.tetrisService.preformNext(this.gameData, this.current, this.next);
        this.next = squareFactory();
        this.socket.emit('preformNext', {type: this.next.type, directive: this.next.directive});
      }
    } else {
      this.socket.emit('down');
    }
    this.timeFunc();
  }

  getScore(line) {
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
    return score;
  }
  getAddLine(line) {
    let lineNum = 0;
    switch (line) {
      case 1:
        lineNum = 0;
        break;
      case 2:
        lineNum = 0;
        break;
      case 3:
        lineNum = 2;
        break;
      case 4:
        lineNum = 3;
        break;
    }
    return lineNum;
  }

  timeFunc() {
    timeCount++;
    if (timeCount === 5) {
      this.time++;
      timeCount = 0;
      // 测试干扰
      // if (this.time !== 0 && this.time % 10 === 0) {
      //   this.tetrisService.addTailLines(this.gameData, this.current, this.tetrisService.generateLines(1));
      // }
      // 测试干扰 end
    }
  }

  stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    $('body').off('keydown.square');
  }

  bindKeyEvent() {
    $('body').on('keydown.square', (e) => {
      const keyCode = e.which;
      if (keyCode === 37) {
        this.tetrisService.move(this.gameData, this.current, 'left');
        this.socket.emit('left');
      } else if (keyCode === 38) {
        this.tetrisService.rotate(this.gameData, this.current);
        this.socket.emit('rotate');
      } else if (keyCode === 39) {
        this.tetrisService.move(this.gameData, this.current, 'right');
        this.socket.emit('right');
      } else if (keyCode === 40) {
        this.tetrisService.move(this.gameData, this.current, 'down');
        this.socket.emit('down');
      } else if (keyCode === 32) {
        this.fall(this.gameData, this.current);
        this.socket.emit('fall');
      }
    });
  }

  fall(data, current) {
    while (this.tetrisService.move(data, current, 'down')) {
    }
  }
}
