import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  ICoinDynamicQuery,
  IListenCoinDynamicSubscription,
} from "@blockchain_client/graph-ql-client";
import { LineChartData } from "../../shared/charts/line-chart-data";
type DynamicData = ICoinDynamicQuery["coinDynamicData"] | IListenCoinDynamicSubscription["coinDynamicData"];
@Component({
  selector: 'difficulty-graph',
  templateUrl: './difficulty-graph.component.html',
  styleUrls: ['./difficulty-graph.component.css']
})
export class DifficultyGraphComponent {
  public data?: LineChartData = undefined;
  data$: Observable<undefined | DynamicData> = this.gql.coinDynamic({coin: 'ETC'}).pipe(
    map(response => response.data?.coinDynamicData),
    tap(data => this.data = {
      labels: data?.labels?.map(v => new Date(v).toLocaleDateString()) || [''],
      dataset: {
        'Difficulty': data?.difficultyData || [0],
        'Hash Rate': data?.hashrateData || [0]
      }
    }),
    switchMap(() => this.gql.listenCoinDynamic({coin: 'ETC'})),
    map(response => response.data?.coinDynamicData),
    tap(data => this.data = {
      labels: data?.labels?.map(v => new Date(v).toLocaleDateString()) || [''],
      dataset: {
        'Difficulty': data?.difficultyData || [0],
        'Hash Rate': data?.hashrateData || [0]
      }
    }),
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
