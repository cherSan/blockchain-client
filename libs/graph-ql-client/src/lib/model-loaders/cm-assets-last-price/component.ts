import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { CmAssetsLastPriceLoaderType } from './type';
@Component({
  selector: 'ldr-cm-assets-last-price',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class CmAssetsLastPriceLoaderComponent extends ModelViewerComponent<CmAssetsLastPriceLoaderType> {
  @Output()
  public override change: EventEmitter<null | CmAssetsLastPriceLoaderType> =
    new EventEmitter<null | CmAssetsLastPriceLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .cmAssetsLastPriceGet()
      .pipe(map((response) => response.data?.cmAssetsLastPrice));
    const listener$ = gql
      .cmAssetsLastPriceListen()
      .pipe(map((response) => response.data?.cmAssetsLastPrice));
    super(query$, listener$);
  }
}
