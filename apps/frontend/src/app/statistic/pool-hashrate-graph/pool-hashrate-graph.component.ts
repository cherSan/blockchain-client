import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap } from "rxjs";
import { ApolloAngularSDK, IListenStatsSubscription, IStatsQuery } from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'pool-hashrate-graph',
  templateUrl: './pool-hashrate-graph.component.html',
  styleUrls: ['./pool-hashrate-graph.component.scss']
})
export class PoolHashrateGraphComponent {
  stats$: Observable<undefined | IStatsQuery["stats"] | IListenStatsSubscription["stats"]> = this.gql.stats().pipe(
    map(response => response.data?.stats),
    switchMap(() => this.gql.listenStats()),
    map(response => response.data?.stats)
  );

  stateError$ = this.stats$.pipe(
    ignoreElements(),
    catchError((err) => {
      console.log(err);
      return of(err);
    })
  )

  constructor(
    private gql: ApolloAngularSDK
  ) { }

}
