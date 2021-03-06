const squares = [
  // 竖杠
  [
    [
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [20, 20, 20, 20],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
      [0, 20, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [20, 20, 20, 20],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 正7
  [
    [
      [21, 21, 0, 0],
      [0, 21, 0, 0],
      [0, 21, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 21, 0],
      [21, 21, 21, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [21, 0, 0, 0],
      [21, 0, 0, 0],
      [21, 21, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [21, 21, 21, 0],
      [21, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 反7
  [
    [
      [22, 22, 0, 0],
      [22, 0, 0, 0],
      [22, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [22, 22, 22, 0],
      [0, 0, 22, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 22, 0, 0],
      [0, 22, 0, 0],
      [22, 22, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [22, 0, 0, 0],
      [22, 22, 22, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // T
  [
    [
      [0, 23, 0, 0],
      [23, 23, 23, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 23, 0, 0],
      [0, 23, 23, 0],
      [0, 23, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [23, 23, 23, 0],
      [0, 23, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 23, 0, 0],
      [23, 23, 0, 0],
      [0, 23, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 正2
  [
    [
      [24, 24, 0, 0],
      [0, 24, 24, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 24, 0, 0],
      [24, 24, 0, 0],
      [24, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [24, 24, 0, 0],
      [0, 24, 24, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 24, 0, 0],
      [24, 24, 0, 0],
      [24, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 反2
  [
    [
      [0, 25, 25, 0],
      [25, 25, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [25, 0, 0, 0],
      [25, 25, 0, 0],
      [0, 25, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 25, 25, 0],
      [25, 25, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [25, 0, 0, 0],
      [25, 25, 0, 0],
      [0, 25, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 田
  [
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [26, 26, 0, 0],
      [26, 26, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
];
export class Square {
  constructor(public type: number = 0,
              public directive: number = 0, // 旋转的方向
              public data: Array<Array<number>> = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
              public origin: { x: number, y: number } = {x: 0, y: 3}) {
  }

  /**
   * 移动的方向
   * @param directive
   */
  move(directive) {
    if (directive === 'down') {
      this.origin.x++;
    } else if (directive === 'left') {
      this.origin.y--;
    } else if (directive === 'right') {
      this.origin.y++;
    }
  }
  getData() {
    return squares[this.type][this.directive];
  }
  rotate() {
    this.directive = (++this.directive) % 4;
    this.data = this.getData();
  }
  getRotateData() {
    let testDirective = this.directive + 1;
    if (testDirective === 4) {
      testDirective = 0;
    }
    return squares[this.type][testDirective];
  }
}
export function squareFactory(type = Math.floor(Math.random() * 7), directive = Math.floor(Math.random() * 4)) {
  return new Square(type, directive, squares[type][directive]);
}
