import { Component } from '@angular/core';
import { map } from "rxjs";
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { ModelViewerComponent } from "../components";
import { EtcPayments } from "./etc-payments";

@Component({
  selector: 'mdl-etc-payments',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss']
})
export class EtcPaymentsComponent extends ModelViewerComponent<EtcPayments> {
  protected override query$ = this.gql.etcMinerPayments().pipe(
    map(response => response.data?.etcMinersPaymentsData)
  );
  protected override listener$ = this.gql.etcMinerPaymentsListen().pipe(
    map(response => response.data?.etcMinersPaymentsData)
  );
  public override noDataMessage = "Sorry, but we didn't find any Miners Payments.";
  public override title = 'Miners Payments';
  constructor(
    private gql: ApolloAngularSDK
  ) {
    super()
  }
}
