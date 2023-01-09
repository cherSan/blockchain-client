import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { PoolEtcPaymentsLoaderType } from './type';
@Component({
  selector: 'ldr-pool-etc-payments',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class PoolEtcPaymentsLoaderComponent extends ModelViewerComponent<PoolEtcPaymentsLoaderType> {
  @Output()
  public override change: EventEmitter<null | PoolEtcPaymentsLoaderType> =
    new EventEmitter<null | PoolEtcPaymentsLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .poolEtcPaymentsGet()
      .pipe(map((response) => response.data?.poolEtcPayments));
    const listener$ = gql
      .poolEtcPaymentsListen()
      .pipe(map((response) => response.data?.poolEtcPayments));
    super(query$, listener$);
  }
}
