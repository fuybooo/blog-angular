declare let $: any;
export const squares = [
  // 竖杠
  [
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 正7
  [
    [
      [2, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 2, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 2, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 反7
  [
    [
      [2, 2, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 0, 0, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // T
  [
    [
      [0, 2, 0, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [0, 2, 2, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 2, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 正2
  [
    [
      [2, 2, 0, 0],
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [2, 2, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 0, 0],
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [2, 2, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 反2
  [
    [
      [0, 2, 2, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 0, 0, 0],
      [2, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 2, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 0, 0, 0],
      [2, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // 田
  [
    [
      [2, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 2, 0, 0],
      [2, 2, 0, 0],
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
    return $.extend(true, [], squares[this.type][this.directive]);
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
    return $.extend(true, [], squares[this.type][testDirective]);
  }
}
export function squareFactory(type?, directive?) {
  if (type === undefined) {
    type = getRandom(7);
  }
  if (directive === undefined) {
    directive = getRandom(4);
  }
  return new Square(type, directive, $.extend(true, [], squares[type][directive]));
}
export function getRandom(num) {
  return Math.floor(Math.random() * num);
}
