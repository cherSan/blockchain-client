import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { from, Observable, of, switchMap } from "rxjs";
import { DEFAULT_ROUTE } from "@blockchain_client/initialization";

import { UserService } from "../services/user.service";
import { Roles } from "../enums/roles";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    @Inject(DEFAULT_ROUTE) private defaultRoute: string,
    private user: UserService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
  {
    return this.user.role$.pipe(
      switchMap((role) => {
        const existRoles: Roles[] = route.data['roles'] as unknown as Roles[];
        if (existRoles && existRoles.includes(role)) {
          return of(true);
        }
        return from(this.router.navigate([this.defaultRoute], {replaceUrl: true}).then(() => {
          console.info('Route unavailable for current user');
          return false
        }))
      })
    )
  }

}
