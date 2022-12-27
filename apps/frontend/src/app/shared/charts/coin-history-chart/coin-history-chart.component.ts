import { Component, Input } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";
import { BehaviorSubject, catchError, combineLatest, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  ICoinHistoryQuery,
  IListenCoinHistorySubscription
} from "@blockchain_client/graph-ql-client";
type CoinHistory = ICoinHistoryQuery["coinHistory"] | IListenCoinHistorySubscription["coinHistory"];
@Component({
  selector: 'coin-history-chart',
  templateUrl: './coin-history-chart.component.html',
  styleUrls: ['./coin-history-chart.component.scss']
})
export class CoinHistoryChartComponent {
  public options: AgChartOptions = {};
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
    this.options = {
      title: {
        text: `${coin} / ${algo} History`
      },
      subtitle: {
        text: new Date(data.update_at).toLocaleDateString()
      },
      data: data?.data,
      series: [
        {
          xKey: 'timestamp',
          yKey: 'difficulty',
          xName: 'Date',
          yName: 'Difficulty',
        },
        {
          xKey: 'timestamp',
          yKey: 'network_hashrate',
          xName: 'Date',
          yName: 'Network Hashrate',
        },
        {
          xKey: 'timestamp',
          yKey: 'price',
          xName: 'Date',
          yName: 'Price',
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: [
            'network_hashrate',
            'difficulty'
          ],
          title: {
            enabled: false
          }
        },
        {
          type: 'number',
          position: 'right',
          keys: ['price'],
          title: {
            enabled: true,
            text: 'USD',
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
