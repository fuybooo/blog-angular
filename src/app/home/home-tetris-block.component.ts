import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Square, squareFactory} from "./home-tetris.model";
import {HomeTetrisService} from "./home-tetris.service";
declare let $: any;
declare let io: any;
let timer = null;
let _timer = null;
let INTERVAL = 200;
type Direction = 'left' | 'right' | 'down';
let timeCount = 0;
let scoreCount = 0;
let tailType = 0;
let isStarted = false;
@Component({
  selector: 'app-home-tetris-block',
  templateUrl: './home-tetris-block.component.html',
})
export class HomeTetrisBlockComponent implements OnInit {
  @Input() data;
  @Input() next: Square;
  @Input() isHost;
  @Input() isNext: boolean;
  @Input() curType;
  @Input() curDirective;
  current: Square;
  @Output() nextEmitter = new EventEmitter();
  @Output() timeChange = new EventEmitter<number>();
  @Output() scoreChange = new EventEmitter<number>();
  @Output() isGameOverChange = new EventEmitter();
  socket: any;
  @Input() remoteData;
  remoteCurrent;
  remoteNext;
  @Output() remoteDataEmitter = new EventEmitter();
  remoteNextEmitter = new EventEmitter();

  constructor(private tetrisService: HomeTetrisService) {
  }

  ngOnInit() {
    if (this.isHost) {
      if (!this.isNext) {
        this.socket = io('ws://localhost:3000/');
        this.tetrisService.commandEmitter.subscribe(command => this.socket.emit('ready'));
        this.watchEvent();
      } else {
        this.setData(true);
      }
    }
  }
  watchEvent() {
    this.socket.on('start', (data) => {
      this.current = squareFactory(data.curType, data.curDirective);
      this.setData(true);
      // 发送初始化消息
      this.socket.emit('init', {type: data.curType, directive: data.curDirective});
      if (!isStarted) {
        this.reset();
        isStarted = true;
        if (!this.isNext) {
          this.bindKeyEvent();
          timer = setInterval(() => this.autoDown(), INTERVAL);
          this.timeFunc();
        }
      }
    });
    this.socket.on('init', (data) => {
      // 初始化remoteData --> 发送改变之后的remoteData 和 remoteNext给父组件即可
      this.remoteCurrent = squareFactory(data.type, data.directive);
      console.log(this.remoteData, this.remoteCurrent);
      this.setData(false);
      this.remoteDataEmitter.emit(this.remoteData);
    });
  }

  reset() {
    console.log('重设游戏');
    this.setData(true, -1); // 全部清除
    this.timeChange.emit(0);
    this.scoreChange.emit(0);
  }

  bindKeyEvent() {
    $('body').on('keydown.square', (e) => {
      const keyCode = e.which;
      if (keyCode === 37) {
        this.move('left');
      } else if (keyCode === 38) {
        this.rotate();
      } else if (keyCode === 39) {
        this.move('right');
      } else if (keyCode === 40) {
        this.move('down');
      } else if (keyCode === 32) {
        this.fall();
      }
    });
  }

  autoDown() {
    if (!this.move('down')) {
      this.setData(true, 1);
      let line = this.checkClear();
      if (line) {
        this.addScore(line);
      }
      let gameOver = this.checkGameOver();
      if (gameOver) {
        this.stop();
        this.isGameOverChange.emit();
      } else {
        this.preformNext();
      }
    }
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
    scoreCount += score;
    this.scoreChange.emit(scoreCount);
  }

  timeFunc() {
    _timer = setInterval(() => {
      this.timeChange.emit(++timeCount);
      // 测试干扰
      // if (timeCount !== 0 && timeCount % 10 === 0) {
      //   this.addTailLines(this.generateLines(1));
      // }
      // 测试干扰 end
    }, 1000);
  }

  preformNext() {
    this.current = this.next;
    this.setData(true);
    this.nextEmitter.emit();
  }

  addTailLines(lines: number[][]) {
    for (let i = 0; i < this.data.length - lines.length; i++) {
      this.data[i] = this.data[i + lines.length];
    }
    for (let i = 0; i < lines.length; i++) {
      this.data[this.data.length - lines.length + i] = lines[i];
    }
    this.current.origin.x = this.current.origin.x - lines.length;
    if (this.current.origin.x < 0) {
      this.current.origin.x = 0;
    }
  }

  generateLines(lineNum) {
    let lines = [];
    for (let i = 0; i < lineNum; i++) {
      tailType = ++tailType % 2;
      let line = [];
      for (let j = 0; j < this.data[0].length; j++) {
        if (tailType % 2) {
          if (j % 2) {
            line.push(1);
          } else {
            line.push(0);
          }
        } else {
          if (j % 2) {
            line.push(0);
          } else {
            line.push(1);
          }
        }
      }
      lines.push(line);
    }
    return lines;
  }

  checkClear() {
    let line = 0;
    for (let i = this.data.length - 1; i >= 0; i--) {
      let clear = true;
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] !== 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line++;
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < this.data[0].length; n++) {
            this.data[m][n] = this.data[m - 1][n];
          }
        }
        for (let n = 0; n < this.data[0].length; n++) {
          this.data[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }

  checkGameOver() {
    let gameOver = false;
    for (let i = 0; i < this.data[0].length; i++) {
      if (this.data[1][i] === 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }

  stop() {
    isStarted = false;
    if (timer) {
      clearInterval(timer);
      clearInterval(_timer);
      timer = null;
      _timer = null;
    }
    $('body').off('keydown.square');
  }

  /**
   * 设置数据
   * @param isHost
   * @param state  -1 为 全部清空, 0 为 清空, 1 为 固定, 不传值为设置对应的值
   */
  setData(isHost, state?) {
    let data;
    if (isHost) {
      data = this.data;
    } else {
      data = this.remoteData;
    }
    let square;
    let origin;
    if (this.isNext) {
      square = this.next.data;
      origin = {x: 0, y: 0};
    } else {
      if (state === -1) {
        square = data;
      }else {
        if (isHost) {
          square = this.current.data;
          origin = this.current.origin;
        } else {
          square = this.remoteCurrent.data;
          origin = this.remoteCurrent.origin;
        }
      }
    }
    for (let i = 0; i < square.length; i++) {
      for (let j = 0; j < square[i].length; j++) {
        if (state === -1) {
          data[i][j] = 0;
        } else if (this.check(origin, i, j)) {
          if (state === 1) {
            if (data[origin.x + i][origin.y + j] === 2) {
              data[origin.x + i][origin.y + j] = 1;
            }
          } else {
            data[origin.x + i][origin.y + j] = (state === 0 ? state : square[i][j]);
          }
        }
      }
    }
  }


  move(directive: Direction) {
    let nextPlace;
    let origin = this.current.origin;
    if (directive === 'down') {
      nextPlace = {x: origin.x + 1, y: origin.y};
    } else if (directive === 'left') {
      nextPlace = {x: origin.x, y: origin.y - 1};
    } else if (directive === 'right') {
      nextPlace = {x: origin.x, y: origin.y + 1};
    }
    if (this.isValid(nextPlace, this.current.data)) {
      this.setData(true, 0); // 清除
      this.current.move(directive);
      this.setData(true);
      return true;
    } else {
      return false;
    }
  }

  rotate() {
    if (this.isValid(this.current.origin, this.current.getRotateData())) {
      this.setData(true, 0); // 清除
      this.current.rotate();
      this.setData(true);
    }
  }

  fall() {
    while (this.move('down')) {
    }
  }

  /**
   * 检查点是否都合法
   * @param pos
   * @param x
   * @param y
   * @returns {boolean}
   */
  check(pos, x, y) {
    if (
      pos.x + x < 0 ||
      pos.x + x >= this.data.length ||
      pos.y + y < 0 ||
      pos.y + y >= this.data[0].length ||
      this.data[pos.x + x][pos.y + y] === 1
    ) {
      return false;
    }
    return true;
  }

  /**
   * 检查方块是否合法
   * @param pos
   * @param data
   * @returns {boolean}
   */
  isValid(pos, data): boolean {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] !== 0 && !this.check(pos, i, j)) {
          return false;
        }
      }
    }
    return true;
  }
}
