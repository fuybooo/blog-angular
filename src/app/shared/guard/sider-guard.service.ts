import {Injectable} from "@angular/core";
import {CommonService} from "../common.service";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
@Injectable()
export class SiderGuard implements CanActivate {
  constructor(private commonService: CommonService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.commonService.emitIsNoSider(route);
    return true;
  }
}
