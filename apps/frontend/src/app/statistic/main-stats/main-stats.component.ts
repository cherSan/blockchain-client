import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap } from "rxjs";
import {
  ApolloAngularSDK,
  IEthersStatsQuery,
  IListenEthersStatsSubscription,
} from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss']
})
export class MainStatsComponent {

  data$: Observable<undefined | IEthersStatsQuery["etherStats"] | IListenEthersStatsSubscription["etherStats"]> = this.gql.ethersStats().pipe(
    map(response => response.data?.etherStats),
    switchMap(() => this.gql.listenEthersStats()),
    map(response => response.data?.etherStats),
  );

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => {
      return of(err);
    })
  )

  constructor(
    private gql: ApolloAngularSDK
  ) { }

}
