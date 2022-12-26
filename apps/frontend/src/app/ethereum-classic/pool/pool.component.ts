import { Component } from '@angular/core';
import {
  ApolloAngularSDK,
  IListenMinerstatsCoinsQuery,
  IMinerstatsCoinsQuery,
} from "@blockchain_client/graph-ql-client";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";

type Coins = IMinerstatsCoinsQuery["coins"] | IListenMinerstatsCoinsQuery["coins"];
@Component({
  selector: 'pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent {
  public stats: undefined | Coins;
  public coinStats: undefined | Coins[number];
  stats$: Observable<undefined | Coins> = this.gql.minerstatsCoins().pipe(
    map(response => response.data?.coins),
    tap(data => {
      this.stats = data;
      this.coinStats = data.find(v => v.coin === 'ETC')
    }),
    switchMap(() => this.gql.listenMinerstatsCoins()),
    map(response => response.data?.coins),
    tap(data => {
      this.stats = data;
      this.coinStats = data.find(v => v.coin === 'ETC')
    }),
  );

  stateError$ = this.stats$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )

  constructor(
    private gql: ApolloAngularSDK
  ) { }

}
