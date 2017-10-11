import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tetris-block',
  templateUrl: './tetris-block.component.html',
})
export class TetrisBlockComponent {
  @Input() data;
}
