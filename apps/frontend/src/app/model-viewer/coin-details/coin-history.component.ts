import { Component, Input } from "@angular/core";
import { BehaviorSubject, combineLatest, map, switchMap } from "rxjs";
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { GraphQLError } from "graphql/error";
import { ModelViewerComponent } from "../components";
import { CoinHistory } from "./coin-history";
@Component({
  selector: 'mdl-coin-history',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss']
})
export class CoinHistoryComponent extends ModelViewerComponent<CoinHistory> {
  @Input()
  set coin(coin: string | undefined) {
    this.coin$.next(coin);
  }
  @Input()
  set algo(algo: string | undefined) {
    this.algo$.next(algo);
  }
  private coin$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private algo$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  protected override query$ = combineLatest(
    [this.coin$, this.algo$]
  ).pipe(
    switchMap(([coin, algo]) => {
      if (!coin)  {
        throw new GraphQLError('Coin not provided');
      }
      if (!algo)  {
        throw new GraphQLError('Algorithm not provided');
      }
      return this.gql.coinHistory({algo, coin}).pipe(
        map(response => response.data?.coinHistory),
      )
    })
  );
  protected override listener$ = combineLatest(
    [this.coin$, this.algo$]
  ).pipe(
    switchMap(([coin, algo]) => {
      if (!coin)  {
        throw new GraphQLError('Coin not provided');
      }
      if (!algo)  {
        throw new GraphQLError('Algorithm not provided');
      }
      return this.gql.listenCoinHistory({algo, coin}).pipe(
        map(response => response.data?.coinHistory),
      )
    })
  );
  public override noDataMessage = "Sorry, but we didn't find any Coin History Information.";
  public override title = 'Coin History Information';
  constructor(
    private gql: ApolloAngularSDK
  ) {
    super()
  }
}
