import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
import {Square, squareFactory} from "./tetris.model";
declare let $: any;
let timer = null;
let INTERVAL = 200;
type Direction = 'left' | 'right' | 'down';
let timeCount = 0;
let tailType = 0;
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
  isGameOver = false;

  constructor() {
    this.next = squareFactory();
    this.current = squareFactory();
  }

  ngOnInit() {
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
  }

  timeFunc() {
    timeCount++;
    if (timeCount === 5) {
      this.time++;
      timeCount = 0;
      // 测试干扰
      // if (this.time !== 0 && this.time % 10 === 0) {
      //   this.addTailLines(this.generateLines(1));
      // }
      // 测试干扰 end
    }
  }

  preformNext() {
    this.current = this.next;
    this.setData();
    this.next = squareFactory();
  }

  addTailLines(lines: number[][]) {
    for (let i = 0; i < this.gameData.length - lines.length; i++) {
      this.gameData[i] = this.gameData[i + lines.length];
    }
    for (let i = 0; i < lines.length; i++) {
      this.gameData[this.gameData.length - lines.length + i] = lines[i];
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
      for (let j = 0; j < this.gameData[0].length; j++) {
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
    for (let i = this.gameData.length - 1; i >= 0; i--) {
      let clear = true;
      for (let j = 0; j < this.gameData[0].length; j++) {
        if (this.gameData[i][j] !== 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line++;
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < this.gameData[0].length; n++) {
            this.gameData[m][n] = this.gameData[m - 1][n];
          }
        }
        for (let n = 0; n < this.gameData[0].length; n++) {
          this.gameData[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }

  checkGameOver() {
    let gameOver = false;
    for (let i = 0; i < this.gameData[0].length; i++) {
      if (this.gameData[1][i] === 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }

  stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    $('body').off('keydown.square');
  }

  /**
   * 设置数据 0 为 清空，1 为 固定 不传值为设置对应的值
   * @param state
   */
  setData(state?) {
    for (let i = 0; i < this.current.data.length; i++) {
      for (let j = 0; j < this.current.data[i].length; j++) {
        if (this.check(this.current.origin, i, j)) {
          if (state === 1) {
            if (this.gameData[this.current.origin.x + i][this.current.origin.y + j] === 2) {
              this.gameData[this.current.origin.x + i][this.current.origin.y + j] = 1;
            }
          } else {
            this.gameData[this.current.origin.x + i][this.current.origin.y + j] = (state === 0 ? state : this.current.data[i][j]);
          }
        }
      }
    }
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

  move(directive: Direction) {
    let nextPlace;
    if (directive === 'down') {
      nextPlace = {x: this.current.origin.x + 1, y: this.current.origin.y};
    } else if (directive === 'left') {
      nextPlace = {x: this.current.origin.x, y: this.current.origin.y - 1};
    } else if (directive === 'right') {
      nextPlace = {x: this.current.origin.x, y: this.current.origin.y + 1};
    }
    if (this.isValid(nextPlace, this.current.data)) {
      this.setData(0); // 清除
      this.current.move(directive);
      this.setData();
      return true;
    } else {
      return false;
    }
  }

  rotate() {
    if (this.isValid(this.current.origin, this.current.getRotateData())) {
      this.setData(0); // 清除
      this.current.rotate();
      this.setData();
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
      pos.x + x >= this.gameData.length ||
      pos.y + y < 0 ||
      pos.y + y >= this.gameData[0].length ||
      this.gameData[pos.x + x][pos.y + y] === 1
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
