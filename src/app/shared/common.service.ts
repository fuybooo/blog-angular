import {EventEmitter, Injectable} from "@angular/core";
@Injectable()
export class CommonService {
  isHomeEmit = new EventEmitter();
  constructor() {}
  emitIsHome(toRoute) {
    let path1 = toRoute.url[0].path;
    let path2 = toRoute.url[1].path;
    if (toRoute.url.length === 2 && path1 === 'app' && path2 === 'home') {
      this.isHomeEmit.emit(true);
    } else {
      this.isHomeEmit.emit(false);
    }
  }
}
