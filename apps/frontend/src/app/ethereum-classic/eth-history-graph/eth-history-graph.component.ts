import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IEthHistoryQuery,
  IListenEthHistorySubscription
} from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'eth-history-graph',
  templateUrl: './eth-history-graph.component.html',
  styleUrls: ['./eth-history-graph.component.scss']
})
export class EthHistoryGraphComponent {
  public data: undefined | IEthHistoryQuery["history"] | IListenEthHistorySubscription["history"];
  data$: Observable<undefined | IEthHistoryQuery["history"] | IListenEthHistorySubscription["history"]> = this.gql.ethHistory().pipe(
    map(response => response.data?.history),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenEthHistory()),
    map(response => response.data?.history),
    tap(data => this.data = data),
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
