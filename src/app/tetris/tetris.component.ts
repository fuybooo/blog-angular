import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
import {Square, squareFactory} from "./tetris.model";
import {TetrisService} from "./tetris.service";
declare let $: any;
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
  isGameOver = false;

  constructor(private tetrisService: TetrisService) {
    this.next = squareFactory();
    this.current = squareFactory();
  }

  ngOnInit() {
    this.tetrisService.setData(this.gameData, this.current);
    this.bindKeyEvent();
  }

  start($event) {
    $($event.target).blur();
    timer = setInterval(() => this.autoDown(), INTERVAL);
  }

  autoDown() {
    if (!this.tetrisService.move(this.gameData, this.current, 'down')) {
      this.tetrisService.setData(this.gameData, this.current, 1);
      let line = this.tetrisService.checkClear(this.gameData);
      if (line) {
        let score = this.getScore(line);
        this.score += score;
      }
      let gameOver = this.tetrisService.checkGameOver(this.gameData);
      if (gameOver) {
        this.stop();
        this.isGameOver = true;
      } else {
        this.tetrisService.preformNext(this.gameData, this.current, this.next);
      }
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
      } else if (keyCode === 38) {
        this.tetrisService.rotate(this.gameData, this.current);
      } else if (keyCode === 39) {
        this.tetrisService.move(this.gameData, this.current, 'right');
      } else if (keyCode === 40) {
        this.tetrisService.move(this.gameData, this.current, 'down');
      } else if (keyCode === 32) {
        this.fall(this.gameData, this.current);
      }
    });
  }

  fall(data, current) {
    while (this.tetrisService.move(data, current, 'down')) {
    }
  }
}
