import { Component, Input } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";
import { BehaviorSubject, catchError, combineLatest, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  ICoinHistoryQuery,
  IListenCoinHistorySubscription
} from "@blockchain_client/graph-ql-client";
import { siSymbol } from "../../../utils/si-symbol";
type CoinHistory = ICoinHistoryQuery["coinHistory"] | IListenCoinHistorySubscription["coinHistory"];
@Component({
  selector: 'coin-history-chart',
  templateUrl: './coin-history-chart.component.html',
  styleUrls: ['./coin-history-chart.component.scss']
})
export class CoinHistoryChartComponent {
  public options: AgChartOptions = {};
  @Input()
  fields = {
    network_hashrate: true,
    difficulty: true,
    price: true
  }
  @Input()
  set coin(coin: string) {
    this.coin$.next(coin);
  }
  @Input()
  set algo(algo: string) {
    this.algo$.next(algo);
  }
  private algo$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private coin$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private data$: Observable<undefined | CoinHistory> = combineLatest(
    [this.coin$, this.algo$]
  ).pipe(
    switchMap(([coin, algo]) => {
      if (!coin || !algo) {
        return of(undefined);
      }
      return this.gql.coinHistory({coin, algo}).pipe(
        map(response => response.data?.coinHistory),
        tap(data => this.createOptions(coin, algo, data)),
        switchMap(() => this.gql.listenCoinHistory({coin, algo})),
        map(response => response.data?.coinHistory),
        tap(data => this.createOptions(coin, algo, data)),
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
  private createOptions(coin: string, algo: string, data: CoinHistory | undefined): void {
    if (!data) {
      return;
    }
    const series = [];
    if (this.fields.difficulty) {
      series.push({
        xKey: 'timestamp',
        yKey: 'difficulty',
        xName: 'Date',
        yName: 'Difficulty',
      })
    }
    if (this.fields.network_hashrate) {
      series.push({
        xKey: 'timestamp',
        yKey: 'network_hashrate',
        xName: 'Date',
        yName: 'Network Hashrate',
      })
    }
    if (this.fields.price) {
      series.push({
        xKey: 'timestamp',
        yKey: 'price',
        xName: 'Date',
        yName: 'Price',
      })
    }
    this.options = {
      title: {
        text: `${coin} / ${algo} History`
      },
      subtitle: {
        text: new Date(data.update_at).toUTCString()
      },
      data: data?.data,
      series,
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: [
            'network_hashrate',
            'difficulty'
          ],
          title: {
            enabled: true,
            text: 'Hashrate / Difficulty'
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value);
            }
          }
        },
        {
          type: 'number',
          position: 'right',
          keys: ['price'],
          title: {
            enabled: true,
            text: 'USD',
          },
          label: {
            formatter: (params) => {
              return '$' + params.value.toLocaleString();
            }
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['timestamp'],
          title: {
            enabled: true,
            text: 'Date-Time',
          }
        }
      ]
    };
  }
}
