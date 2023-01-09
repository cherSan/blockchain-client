import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { PoolEtcBlocksLoaderType } from './type';
@Component({
  selector: 'ldr-pool-etc-blocks',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class PoolEtcBlocksLoaderComponent extends ModelViewerComponent<PoolEtcBlocksLoaderType> {
  @Output()
  public override change: EventEmitter<null | PoolEtcBlocksLoaderType> =
    new EventEmitter<null | PoolEtcBlocksLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .poolEtcBlocksGet()
      .pipe(map((response) => response.data?.poolEtcBlocks));
    const listener$ = gql
      .poolEtcBlocksListen()
      .pipe(map((response) => response.data?.poolEtcBlocks));
    super(query$, listener$);
  }
}
