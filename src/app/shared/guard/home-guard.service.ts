import {Injectable} from "@angular/core";
import {CommonService} from "../common.service";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private commonService: CommonService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.commonService.emitIsHome(route);
    return true;
  }
}
