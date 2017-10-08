import {EventEmitter, Injectable} from "@angular/core";
@Injectable()
export class HomeTetrisService {
  commandEmitter = new EventEmitter();
}
