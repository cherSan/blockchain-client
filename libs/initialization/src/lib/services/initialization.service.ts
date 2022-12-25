import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { from, of, switchMap } from "rxjs";

import { NzIconService } from "ng-zorro-antd/icon";

import { UserService } from "@blockchain_client/user";

import { DEFAULT_ROUTE } from "./default-route.injection";
import { INITIALIZE_ROUTE } from "./initialize-route.injection";

@Injectable({
  providedIn: 'root'
})
export class InitializationService {

  private lastGuardedRoute: string[];

  setRoute(route: string) {
    this.lastGuardedRoute = route !== this.initializeRoute.join() ? [route] : this.defaultRoute;
  }

  constructor(
    @Inject(DEFAULT_ROUTE) private defaultRoute: string[],
    @Inject(INITIALIZE_ROUTE) private initializeRoute: string[],
    private route: Router,
    private user: UserService,
    private iconService: NzIconService
  ) {
    this.lastGuardedRoute = defaultRoute;
  }

  run() {
    setTimeout(() => {

      this.user.checkUser().pipe(
        switchMap(() => {
          this.iconService.fetchFromIconfont({
            scriptUrl: '//at.alicdn.com/t/c/font_3838451_2p59wcyvae3.js'
          });
          console.info('Fetch icons: complete');
          return of(true);
        }),
        switchMap(() => {
          return from(
            this.route.navigate(this.lastGuardedRoute, { replaceUrl: true }).then(() => {
              console.info('Initialization complete')
            })
          )
        })
      ).subscribe()
    }, 1000);
  }
}
