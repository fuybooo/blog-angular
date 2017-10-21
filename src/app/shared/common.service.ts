import {EventEmitter, Injectable} from "@angular/core";
@Injectable()
export class CommonService {
  isNoSiderEmit = new EventEmitter();
  constructor() {}
  emitIsNoSider(toRoute) {
    let path1 = toRoute.url[0].path;
    let path2 = toRoute.url[1].path;
    if (toRoute.url.length === 2 && path1 === 'app' &&
      (path2 === 'home' || path2 === 'tetris')) {
      this.isNoSiderEmit.emit(true);
    } else {
      this.isNoSiderEmit.emit(false);
    }
  }
}
