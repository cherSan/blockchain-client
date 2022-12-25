import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IEtcHistoryQuery,
  IListenEtcHistorySubscription,
} from "@blockchain_client/graph-ql-client";

type History = IEtcHistoryQuery["etcHistory"] | IListenEtcHistorySubscription["etcHistory"];

@Component({
  selector: 'eth-history-graph',
  templateUrl: './eth-history-graph.component.html',
  styleUrls: ['./eth-history-graph.component.scss']
})
export class EthHistoryGraphComponent {
  public data: undefined | History;
  data$: Observable<undefined | History> = this.gql.etcHistory().pipe(
    map(response => response.data?.etcHistory),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenEtcHistory()),
    map(response => response.data?.etcHistory),
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
