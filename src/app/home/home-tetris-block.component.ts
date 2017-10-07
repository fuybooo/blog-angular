import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home-tetris-block',
  templateUrl: './home-tetris-block.component.html',
})
export class HomeTetrisBlockComponent {
  @Input() data;
}
