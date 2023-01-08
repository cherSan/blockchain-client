import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { CmAssetsPriceHistoryLoaderType } from './type';
@Component({
  selector: 'ldr-cm-assets-price-history',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class CmAssetsPriceHistoryLoaderComponent extends ModelViewerComponent<CmAssetsPriceHistoryLoaderType> {
  @Output()
  public override change: EventEmitter<null | CmAssetsPriceHistoryLoaderType> =
    new EventEmitter<null | CmAssetsPriceHistoryLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .cmAssetsPriceHistoryGet()
      .pipe(map((response) => response.data?.cmAssetsPriceHistory));
    const listener$ = gql
      .cmAssetsPriceHistoryListen()
      .pipe(map((response) => response.data?.cmAssetsPriceHistory));
    super(query$, listener$);
  }
}
