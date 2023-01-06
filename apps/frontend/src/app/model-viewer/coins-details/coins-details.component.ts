import { Component } from "@angular/core";
import { map } from "rxjs";
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { ModelViewerComponent } from "../components";
import { Coins } from "./coins-details";
@Component({
  selector: 'mdl-coins',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss']
})
export class CoinsDetailsComponent extends ModelViewerComponent<Coins> {
  protected override query$ = this.gql.minerstatsCoins().pipe(
    map(response => response.data?.coins),
  );
  protected override listener$ = this.gql.listenMinerstatsCoins().pipe(
    map(response => response.data?.coins),
  );
  public override noDataMessage = "Sorry, but we didn't find any coins information.";
  public override title = 'Coins Information';
  constructor(
    private gql: ApolloAngularSDK
  ) {
    super()
  }
}
