import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { from, Observable, of, switchMap } from "rxjs";
import { Roles, UserService } from "@blockchain_client/user";
import { InitializationService } from "../services/initialization.service";
import { INITIALIZE_ROUTE } from "../services/initialize-route.injection";

@Injectable({
  providedIn: 'root'
})
export class InitializationGuard implements CanActivate {

  constructor(
    @Inject(INITIALIZE_ROUTE) private initializeRoute: string[],
    private user: UserService,
    private initialization: InitializationService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    this.initialization.setRoute(state.url)

    return this.user.role$.pipe(
      switchMap((role) => {
        if (role !== Roles.ANON) {
          return of(true);
        }
        return from(this.router.navigate(this.initializeRoute, { replaceUrl: true })
          .then(() => {
            console.info('Check user');
            return false
          }));
      })
    )
  }

}
