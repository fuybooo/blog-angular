import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
import {Square, squareFactory} from "./tetris.model";
import {TetrisService} from "./tetris.service";
declare let $: any;
declare let io: any;
let timer = null;
let timeCounter = null;
let count = 0;
let INTERVAL = 20;
let isStarted = false;
let defaultVelocity = 3000;
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
  msg = '';
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
  remoteMsg = '';
  isGameOver = false;
  level = 1;
  blockCount = 0;
  blockCountRate = 0;
  keyCount = 0;
  keyCountRate = 0;
  onefold = 0;
  twofold = 0;
  treefold = 0;
  fourfold = 0;
  lines = 0;
  highest;
  isPractice = false;
  isProjection = true;
  private velocity = 400;
  private socket;

  constructor(private tetrisService: TetrisService) {
  }
  ngOnInit() {
    this.highest = localStorage.getItem('highest') || 0;
    this.bindStartKeyEvent();
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
      this.tetrisService.addTailLines(this.gameData, this.current, this.tetrisService.generateLines(data));
    });
    this.socket.on('leave', () => {
      this.remoteMsg = '掉线了...';
    });
  }

  start($event?) {
    if ($event) {
      this.isPractice = true;
      this.velocity = defaultVelocity;
      $($event.target).blur();
    }
    this.bindKeyEvent();
    this.reset();
    this.next = squareFactory();
    this.current = squareFactory();
    this.blockCount ++;
    this.emitSocket('next', {type: this.next.type, directive: this.next.directive});
    this.emitSocket('current', {type: this.current.type, directive: this.current.directive});
    this.tetrisService.setData(this.gameData, this.current);
    this.emitSocket('setData');

    timer = setInterval(() => this.autoDown(), INTERVAL);
    timeCounter = setInterval(() => ++this.time, 1000);
  }
  emitSocket(event, data?) {
    if (this.socket) {
      if (data) {
        this.socket.emit(event, data);
      } else {
        this.socket.emit(event);
      }
    }
  }

  reset() {
    this.tetrisService.clearAll(this.gameData);
    this.tetrisService.clearAll(this.remoteData);
    this.time = 0;
    this.score = 0;
    this.msg = '';
    this.remoteScore = 0;
    this.remoteMsg = '';
    this.isGameOver = false;
    this.blockCount = 0;
    this.blockCountRate = 0;
    this.keyCount = 0;
    this.keyCountRate = 0;
    this.onefold = 0;
    this.twofold = 0;
    this.treefold = 0;
    this.fourfold = 0;
    this.lines = 0;
  }

  ready($event) {
    $($event.target).blur();
    this.isPractice = false;
    // this.socket = io('ws://192.168.0.108:3000/'); // 家里的电脑
    // this.socket = io('ws://192.168.7.58:3000/'); // 公司的电脑
    this.socket = io('ws://localhost:3000/'); // 本机
    this.bindSocketEvent();
    this.tetrisService.clearAll(this.gameData);
    this.tetrisService.clearAll(this.remoteData);
    this.emitSocket('ready');
  }
  pause($event) {
    $($event.target).blur();
  }

  autoDown() {
    ++count;
    // 此处应该只做下降操作
    if ((count * INTERVAL) % this.velocity === 0) {
      if (this.tetrisService.move(this.gameData, this.current, 'down')) {
        this.emitSocket('down');
      }
    }
    // 每20毫秒检测1次是否停止下降，进行固话操作，判断是否可以继续游戏
    if (!this.tetrisService.move(this.gameData, this.current, 'down', true)) {
      this.tetrisService.setData(this.gameData, this.current, 1);
      this.emitSocket('setData', 1);
      let line = this.tetrisService.checkClear(this.gameData);
      this.emitSocket('checkClear');
      if (line) {
        this.score += this.getScore(line);
        if (line === 1) {
          this.onefold ++;
        } else if (line === 2) {
          this.twofold ++;
        } else if (line === 3) {
          this.treefold ++;
        } else if (line === 4) {
          this.fourfold ++;
        }
        this.lines += line;
        this.saveHighest();
        if (this.isPractice) {
          this.changeLevel();
        }
        let addLine = this.getAddLine(line);
        if (!this.isPractice) {
          if (addLine) {
            this.emitSocket('addLine', addLine);
            this.tetrisService.addTailLines(this.remoteData, this.remoteCurrent, this.tetrisService.generateLines(addLine));
          }
        }
      }
      let gameOver = this.tetrisService.checkGameOver(this.gameData);
      this.emitSocket('checkGameOver');
      if (gameOver) {
        this.stop();
        this.isGameOver = true;
      } else {
        this.tetrisService.preformNext(this.gameData, this.current, this.next);
        this.blockCount ++;
        if (this.time) {
          this.blockCountRate = this.blockCount / (this.time / 60);
        }
        this.next = squareFactory();
        this.emitSocket('preformNext', {type: this.next.type, directive: this.next.directive});
      }
    }
  }
  saveHighest() {
    let oldHighest = localStorage.getItem('highest');
    if (!oldHighest || +oldHighest < this.score) {
      localStorage.setItem('highest', this.score + '');
      this.highest = this.score;
    }
  }

  /**
   * 等级 速度
   * @returns {number}
   */
  changeLevel() {
    if (this.score <= 70) {
      this.level = 1;
      this.velocity = defaultVelocity;
    } else if (this.score <= 160) {
      this.level = 2;
      this.velocity = 800;
    } else if (this.score <= 260) {
      this.level = 3;
      this.velocity = 600;
    } else if (this.score <= 400) {
      this.level = 4;
      this.velocity = 400;
    } else if (this.score <= 600) {
      this.level = 5;
      this.velocity = 300;
    } else if (this.score <= 860) {
      this.level = 6;
      this.velocity = 200;
    } else if (this.score <= 1100) {
      this.level = 7;
      this.velocity = 180;
    } else if (this.score <= 1600) {
      this.level = 8;
      this.velocity = 160;
    } else if (this.score <= 2000) {
      this.level = 9;
      this.velocity = 140;
    } else if (this.score <= 2500) {
      this.level = 10;
      this.velocity = 120;
    } else if (this.score <= 3300) {
      this.level = 11;
      this.velocity = 100;
    } else {
      this.level = 12;
      this.velocity = 80;
    }
  }

  getScore(line) {
    let score = 0;
    switch (line) {
      case 1:
        score = 1;
        break;
      case 2:
        score = 3;
        break;
      case 3:
        score = 6;
        break;
      case 4:
        score = 10;
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

  stop($event?) {
    if ($event) {
      $($event.target).blur();
    }
    if (timer) {
      clearInterval(timer);
      clearInterval(timeCounter);
      timer = null;
      timeCounter = null;
      isStarted = false;
    }
    $('body').off('keydown.square.operate');
  }

  bindKeyEvent() {
    $('body').on('keydown.square.operate', (e) => {
      const keyCode = e.which;
      if (keyCode === 37) {
        this.calcKeyEvent();
        this.tetrisService.move(this.gameData, this.current, 'left');
        this.emitSocket('left');
      } else if (keyCode === 38) {
        this.calcKeyEvent();
        this.tetrisService.rotate(this.gameData, this.current);
        this.emitSocket('rotate');
      } else if (keyCode === 39) {
        this.calcKeyEvent();
        this.tetrisService.move(this.gameData, this.current, 'right');
        this.emitSocket('right');
      } else if (keyCode === 40) {
        this.calcKeyEvent();
        this.tetrisService.move(this.gameData, this.current, 'down');
        this.emitSocket('down');
      } else if (keyCode === 32) {
        this.calcKeyEvent();
        this.fall(this.gameData, this.current);
        this.emitSocket('fall');
      }
    });
  }
  calcKeyEvent() {
    this.keyCount ++;
    if (this.time) {
      this.keyCountRate = this.keyCount / (this.time / 60);
    }
  }
  bindStartKeyEvent() {
    $('body').on('keydown.square.enter', (e) => {
      const keyCode = e.which;
      if (keyCode === 13) {
        if (!isStarted) {
          isStarted = true;
          if (e.shiftKey) {
            this.ready({});
          } else {
            this.start({});
          }
        }
      }
    });
  }

  fall(data, current) {
    while (this.tetrisService.move(data, current, 'down')) {
    }
  }
  closeProjection($event) {
    $($event.target).blur();
    if (this.isProjection) {
      this.isProjection = false;
      this.tetrisService.openProjection = false;
    } else {
      this.isProjection = true;
      this.tetrisService.openProjection = true;
    }
  }
}
