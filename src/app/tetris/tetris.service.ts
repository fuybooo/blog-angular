import {Injectable} from "@angular/core";
import {Square, squareFactory} from "./tetris.model";
declare let $: any;
@Injectable()
export class TetrisService {
  tailType = 0;
  openProjection = true;
  setOpenProjection(val) {
    this.openProjection = val;
  }
  check(pos, x, y, data) {
    if (
      pos.x + x < 0 ||
      pos.x + x >= data.length ||
      pos.y + y < 0 ||
      pos.y + y >= data[0].length ||
      data[pos.x + x][pos.y + y] === 1
    ) {
      return false;
    }
    return true;
  }
  isValid(pos, data, checkData) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if ((data[i][j] !== 0 && data[i][j] !== -1) && !this.check(pos, i, j, checkData)) {
          return false;
        }
      }
    }
    return true;
  }
  setProjection(data, current) {
    let projection = this.checkDown(data, current);
    let projections = [];
    while (projection) {
      projection = this.checkDown(data, projection);
      projections.push(projection);
    }
    return projections.slice(-2, -1)[0];
  }

  /**
   * 设置游戏数据
   * @param data 整个游戏区的数据
   * @param current 当前要被设置的数据
   * @param state 设置类型 undefined：正常设置；1：设置为固定；0：设置为空，意思为清空当前块
   */
  setData(data, current, state?) {
    if (this.openProjection) {
      // 清除投影
      for (let m = 0; m < data.length; m++) {
        for (let n = 0; n < data[m].length; n++) {
          let dataItem = data[m][n];
          if (dataItem === -1) {
            data[m][n] = 0;
          }
        }
      }
      if (!state) {
        let projection: any = this.setProjection(data, current);
        // 渲染投影
        if (projection) {
          for (let i = 0; i < projection.data.length; i++) {
            for (let j = 0; j < projection.data[i].length; j++) {
              let projectionItem = projection.data[i][j];
              if (projectionItem > 2) {
                data[projection.origin.x + i][projection.origin.y + j] = -1;
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < current.data.length; i++) {
      for (let j = 0; j < current.data[i].length; j++) {
        if (this.check(current.origin, i, j, data)) {
          if (state === 1) {
            // 大于2代表该位置是色块
            if (data[current.origin.x + i][current.origin.y + j] > 2) {
              data[current.origin.x + i][current.origin.y + j] = 1;
            }
          } else {
            // 设置方块的位置
            data[current.origin.x + i][current.origin.y + j] = (state === 0 ? state : current.data[i][j]);
          }
        }
      }
    }
  }
  clearAll(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        data[i][j] = 0;
      }
    }
  }
  rotate(data, current: Square) {
    if (this.isValid(current.origin, current.getRotateData(), data)) {
      this.setData(data, current, 0); // 清除
      current.rotate();
      this.setData(data, current);
    }
  }
  move(data, current, dir, onlyValid = false) {
    let nextPlace;
    if (dir === 'down') {
      nextPlace = {x: current.origin.x + 1, y: current.origin.y};
    } else if (dir === 'left') {
      nextPlace = {x: current.origin.x, y: current.origin.y - 1};
    } else if (dir === 'right') {
      nextPlace = {x: current.origin.x, y: current.origin.y + 1};
    }
    if (this.isValid(nextPlace, current.data, data)) {
      if (!onlyValid) {
        this.setData(data, current, 0); // 清除
        current.move(dir);
        this.setData(data, current);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * 检查是否能够执行向下，如果能执行则返回下一个执行的对象，否则返回false
   * @param data
   * @param current
   * @returns {any}
   */
  checkDown(data, current) {
    let nextPlace = {x: current.origin.x + 1, y: current.origin.y};
    let nextData = current.data;
    if (this.isValid(nextPlace, nextData, data)) {
      return {
        origin: nextPlace,
        data: nextData
      };
    } else {
      return false;
    }
  }
  checkGameOver(data) {
    let gameOver = false;
    for (let i = 0; i < 10; i++) {
      if (data[1][i] === 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }
  checkClear(data) {
    let line = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      let clear = true;
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] !== 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line++;
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < data[0].length; n++) {
            data[m][n] = data[m - 1][n];
          }
        }
        for (let n = 0; n < data[0].length; n++) {
          data[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }
  generateLines(lineNum) {
    let lines = [];
    for (let i = 0; i < lineNum; i++) {
      this.tailType = ++this.tailType % 2;
      let line = [];
      for (let j = 0; j < 10; j++) {
        if (this.tailType % 2) {
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
  addTailLines(data, current, lines) {
    for (let i = 0; i < data.length - lines.length; i++) {
      data[i] = data[i + lines.length];
    }
    for (let i = 0; i < lines.length; i++) {
      data[data.length - lines.length + i] = lines[i];
    }
    current.origin.x = current.origin.x - lines.length;
    if (current.origin.x < 0) {
      current.origin.x = 0;
    }
  }
  preformNext(data, current, next) {
    current.type = next.type;
    current.directive = next.directive;
    current.data = $.extend(true, [], next.data);
    current.origin = $.extend(true, {}, next.origin);
    this.setData(data, current);
  }
}
