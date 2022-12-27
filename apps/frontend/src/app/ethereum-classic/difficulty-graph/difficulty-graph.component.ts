import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  ICoinDynamicQuery,
  IListenCoinDynamicSubscription,
} from "@blockchain_client/graph-ql-client";
import { LineChartData } from "../../shared/charts/line-chart-data";
import { AgChartOptions } from "ag-charts-community";
type DynamicData = ICoinDynamicQuery["coinDynamicData"] | IListenCoinDynamicSubscription["coinDynamicData"];
@Component({
  selector: 'difficulty-graph',
  templateUrl: './difficulty-graph.component.html',
  styleUrls: ['./difficulty-graph.component.scss']
})
export class DifficultyGraphComponent {
  public data?: LineChartData = undefined;

  public options: AgChartOptions = {}

  data$: Observable<undefined | DynamicData> = this.gql.coinDynamic({coin: 'ETC'}).pipe(
    map(response => response.data?.coinDynamicData),
    tap(data => {
      const parsedData = data.difficultyData.map((v, k) => ({
        timestamp: data.labels[k],
        difficulty: v,
        hashrate: data.hashrateData[k],
        price: data.priceData[k],
      }))
      this.options = {
        background: {
          visible: true,
          fill: '#141414'
        },
        theme: {
          baseTheme: 'ag-vivid-dark'
        },
        title: {
          enabled: true,
          text: 'ETC Statistic'
        },
        autoSize: true,
        axes: [
          {
            position: 'left',
            type: 'number'
          },
          {
            position: 'bottom',
            type: 'time'
          }
        ],
        data: parsedData,
        series: [
          {
            yKey: 'difficulty',
            xKey: 'timestamp',
            xName: 'Date-Time',
            yName: 'Difficulty',
            marker: {
              enabled: false
            }
          },
          {
            yKey: 'hashrate',
            xKey: 'timestamp',
            xName: 'time',
            yName: 'Date-Time',
            marker: {
              enabled: false
            }
          }
        ]
      }
    }),
    switchMap(() => this.gql.listenCoinDynamic({coin: 'ETC'})),
    map(response => response.data?.coinDynamicData),
    tap((data) => {
      const difficulty = data?.difficultyData.map((v, k) => ({
        timestamp: data.labels[k],
        value: v
      }))
      const hashrate = data?.hashrateData.map((v, k) => ({
        timestamp: data.labels[k],
        value: v
      }))
      this.options = {
        title: {
          enabled: true,
          text: 'ETC Statistic'
        },
        autoSize: true,
        axes: [
          {
            position: 'left',
            type: 'number'
          },
          {
            position: 'bottom',
            type: 'time'
          }
        ],
        series: [
          {
            yKey: 'value',
            xKey: 'timestamp',
            xName: 'Date-Time',
            yName: 'Difficulty',
            data: difficulty
          },
          {
            yKey: 'value',
            xKey: 'timestamp',
            xName: 'time',
            yName: 'Date-Time',
            data: hashrate
          }
        ]
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
