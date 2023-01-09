import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { PoolEtcFindersLoaderType } from './type';
@Component({
  selector: 'ldr-pool-etc-finders',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class PoolEtcFindersLoaderComponent extends ModelViewerComponent<PoolEtcFindersLoaderType> {
  @Output()
  public override change: EventEmitter<null | PoolEtcFindersLoaderType> =
    new EventEmitter<null | PoolEtcFindersLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .poolEtcFindersGet()
      .pipe(map((response) => response.data?.poolEtcFinders));
    const listener$ = gql
      .poolEtcFindersListen()
      .pipe(map((response) => response.data?.poolEtcFinders));
    super(query$, listener$);
  }
}
