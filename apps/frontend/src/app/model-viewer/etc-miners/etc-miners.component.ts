import { Component } from '@angular/core';
import { map } from "rxjs";
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { ModelViewerComponent } from "../components";
import { EtcMiners } from "./etc-miners";

@Component({
  selector: 'mdl-etc-miners',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss']
})
export class EtcMinersComponent extends ModelViewerComponent<EtcMiners> {
  protected override query$ = this.gql.etcMiners().pipe(
    map(response => response.data?.etcMinersList)
  );
  protected override listener$ = this.gql.listenEtcMiners().pipe(
    map(response => response.data?.etcMinersList)
  );
  public override noDataMessage = "Sorry, but we didn't find any Miners.";
  public override title = 'Miners';
  constructor(
    private gql: ApolloAngularSDK
  ) {
    super()
  }
}
