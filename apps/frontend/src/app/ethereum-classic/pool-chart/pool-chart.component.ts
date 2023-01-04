import { Component } from '@angular/core';
import { catchError, forkJoin, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  ICoinHistoryQuery, IEtcPoolStatsQuery,
  IListenCoinHistorySubscription, IListenEtcPoolStatsSubscription
} from "@blockchain_client/graph-ql-client";
import { AgChartOptions, time } from "ag-charts-community";
import { siSymbol } from "../../utils/si-symbol";
import * as moment from "moment/moment";

type CoinHistory = ICoinHistoryQuery["coinHistory"] | IListenCoinHistorySubscription["coinHistory"];
type PoolData = IEtcPoolStatsQuery["etcPoolStats"] | IListenEtcPoolStatsSubscription["etcPoolStats"];
@Component({
  selector: 'pool-chart',
  templateUrl: './pool-chart.component.html',
  styleUrls: ['./pool-chart.component.css']
})
export class PoolChartComponent {
  public options: AgChartOptions = {};
  private data$: Observable<any> = forkJoin([
    this.gql.coinHistory({coin: 'ETC', algo: 'Etchash'}),
    this.gql.etcPoolStats()
  ])
    .pipe(
      map(([response1, response2]) => {
        return {
          history: response1.data?.coinHistory,
          poolStat: response2.data.etcPoolStats
        }
      }),
      tap(data => {
        this.createOptions(data)
      }),
      switchMap(() => forkJoin([
        this.gql.listenCoinHistory({coin: 'ETC', algo: 'Etchash'}),
        this.gql.listenEtcPoolStats()
      ])),
      map(([response1, response2]) => {
        return {
          history: response1.data?.coinHistory,
          poolStat: response2.data?.etcPoolStats
        }
      }),
      tap(data => this.createOptions(data)),
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
  private createOptions(coinHistoryData: {
    history?: CoinHistory,
    poolStat?: PoolData
  }): void {
    const poolChartsTime = (coinHistoryData.poolStat?.poolCharts[0]["x"] || 0) * 1000;
    const nhr = coinHistoryData.history?.data.filter((v) => v.timestamp >= poolChartsTime)
    const phr = coinHistoryData.poolStat?.poolCharts.map((v) => ({
      ...v,
      x: v.x * 1000
    }))

    this.options = {
      title: {
        text: `Network / Pool Hashrate`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      series: [
        {
          type: 'line',
          xKey: 'timestamp',
          yKey: 'network_hashrate',
          xName: 'Date',
          yName: 'Network Hashrate',
          data: nhr
        },
        {
          xKey: 'x',
          yKey: 'y',
          xName: 'Date',
          yName: 'Pool Hashrate',
          data: phr
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['network_hashrate'],
          title: {
            enabled: true,
            text: 'Network Hashrate'
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H/s');
            },
          },
        },
        {
          type: 'number',
          position: 'right',
          keys: ['y'],
          title: {
            enabled: true,
            text: 'Pool Hashrate',
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H/s');
            },
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['timestamp','x'],
          title: {
            enabled: true,
            text: 'Date-Time',
          },
          tick: {
            count: time.minute.every(20)
          }
        }
      ]
    };
  }
}
