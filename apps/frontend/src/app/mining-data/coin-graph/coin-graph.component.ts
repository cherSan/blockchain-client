import { Component, Input } from "@angular/core";
import { BehaviorSubject, catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  ICoinDynamicQuery,
  IListenCoinDynamicSubscription
} from "@blockchain_client/graph-ql-client";
import { LineChartData } from "../../shared/charts/line-chart-data";
type DynamicData = ICoinDynamicQuery["coinDynamicData"] | IListenCoinDynamicSubscription["coinDynamicData"];
@Component({
  selector: 'coin-graph',
  templateUrl: './coin-graph.component.html',
  styleUrls: ['./coin-graph.component.scss']
})
export class CoinGraphComponent {
  public data?: LineChartData = undefined;

  public coin$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  @Input()
  set coin(coin: string) {
    this.coin$.next(coin);
  }
  @Input()
  title: string = '';

  data$: Observable<undefined | DynamicData> = this.coin$.pipe(
    switchMap((coin) => {
      if (!coin) {
        return of(undefined);
      }
      return this.gql.coinDynamic({coin: coin}).pipe(
        map(response => response.data?.coinDynamicData),
        tap(data => this.data = {
          labels: data?.labels?.map(v => new Date(v).toLocaleDateString()) || [''],
          dataset: {
            'Difficulty': data?.difficultyData || [0],
            'Hash Rate': data?.hashrateData || [0]
          }
        }),
        switchMap(() => this.gql.listenCoinDynamic({coin: coin})),
        map(response => response.data?.coinDynamicData),
        tap(data => this.data = {
          labels: data?.labels?.map(v => new Date(v).toLocaleDateString()) || [''],
          dataset: {
            'Difficulty': data?.difficultyData || [0],
            'Hash Rate': data?.hashrateData || [0]
          }
        }),
      );
    })
  )

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
