import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-home-tetris-block-remote',
  templateUrl: './home-tetris-block.component.html',
})
export class HomeTetrisBlockRemoteComponent {
  @Input() data;
}
