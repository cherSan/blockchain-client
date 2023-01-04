import { Component, OnInit } from "@angular/core";
import {
  ApolloAngularSDK,
  IListenMinerstatsCoinsQuery,
  IMinerstatsCoinsQuery
} from "@blockchain_client/graph-ql-client";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";

type Coins = IMinerstatsCoinsQuery["coins"] | IListenMinerstatsCoinsQuery["coins"]
type Coin = Coins[number]
@Component({
  selector: 'coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  data: undefined | Coin;
  private data$: Observable<undefined | Coins> =this. activeRoute.params.pipe(
    switchMap((params) => {
      const coin = params['coin'];
      const algo = params['algo'];
      if (!coin || !algo) {
        return of(undefined);
      }
      return this.gql.minerstatsCoins().pipe(
        map(response => response.data?.coins),
        tap(data => this.data = data.find(v => v.coin === coin)),
        switchMap(() => this.gql.listenMinerstatsCoins()),
        map(response => response.data?.coins),
        tap(data => this.data = data.find(v => v.coin === coin)),
      );
    })
  );

  public error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )
  constructor(
    private gql: ApolloAngularSDK,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }
}
