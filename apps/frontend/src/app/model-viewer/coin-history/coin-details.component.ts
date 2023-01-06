import { Component, Input } from "@angular/core";
import { BehaviorSubject, map, switchMap } from "rxjs";
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { GraphQLError } from "graphql/error";
import { ModelViewerComponent } from "../components";
import { Coin } from "./coin-details";
@Component({
  selector: 'mdl-coin',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss']
})
export class CoinDetailsComponent extends ModelViewerComponent<Coin> {
  @Input()
  set coin(coin: string | undefined) {
    this.coin$.next(coin);
  }
  private coin$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  protected override query$ = this.coin$.pipe(
    switchMap(coin => {
      if (!coin)  {
        throw new GraphQLError('Coin not provided');
      }
      return this.gql.minerstatsCoins().pipe(
        map(response => response.data?.coins),
        map(data => data?.find(v => v.coin === coin)),
      )
    })
  );
  protected override listener$ = this.coin$.pipe(
    switchMap(coin => {
      if (!coin)  {
        throw new GraphQLError('Coin not provided');
      }
      return this.gql.listenMinerstatsCoins().pipe(
        map(response => response.data?.coins),
        map(data => data?.find(v => v.coin === coin))
      )
    })
  );
  public override noDataMessage = "Sorry, but we didn't find any Coin Information.";
  public override title = 'Coin Information';
  constructor(
    private gql: ApolloAngularSDK
  ) {
    super()
  }
}
