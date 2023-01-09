import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { PoolEtcStatsLoaderType } from './type';
@Component({
  selector: 'ldr-pool-etc-stats',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class PoolEtcStatsLoaderComponent extends ModelViewerComponent<PoolEtcStatsLoaderType> {
  @Output()
  public override change: EventEmitter<null | PoolEtcStatsLoaderType> =
    new EventEmitter<null | PoolEtcStatsLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .poolEtcStatsGet()
      .pipe(map((response) => response.data?.poolEtcStats));
    const listener$ = gql
      .poolEtcStatsListen()
      .pipe(map((response) => response.data?.poolEtcStats));
    super(query$, listener$);
  }
}
