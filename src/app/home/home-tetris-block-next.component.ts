import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-home-tetris-block-next',
  templateUrl: './home-tetris-block.component.html',
})
export class HomeTetrisBlockNextComponent {
  @Input() data;
}
