import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "@blockchain_client/user";
import { from, switchMap } from "rxjs";
import { DEFAULT_ROUTE } from "./default-route.injection";

@Injectable({
  providedIn: 'root'
})
export class InitializationService {

  private lastGuardedRoute: string;

  setRoute(route: string) {
    this.lastGuardedRoute =
      route !== '' && route !== '/' ?
        route :
        this.defaultRoute;
  }

  constructor(
    @Inject(DEFAULT_ROUTE) private defaultRoute: string,
    private route: Router,
    private user: UserService
  ) {
    this.lastGuardedRoute = defaultRoute;
  }

  run() {
    setTimeout(() => {
      this.user.checkUser().pipe(
        switchMap(() => {
          return from(
            this.route.navigate([this.lastGuardedRoute], { replaceUrl: true }).then(() => {
              console.info('Initialization complete')
            })
          )
        })
      ).subscribe()
    }, 1000);
  }
}
