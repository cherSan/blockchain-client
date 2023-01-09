import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { CmAssetsLoaderType } from './type';
@Component({
  selector: 'ldr-cm-assets',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class CmAssetsLoaderComponent extends ModelViewerComponent<CmAssetsLoaderType> {
  @Output()
  public override change: EventEmitter<null | CmAssetsLoaderType> =
    new EventEmitter<null | CmAssetsLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .cmAssetsGet()
      .pipe(map((response) => response.data?.cmAssets));
    const listener$ = gql
      .cmAssetsListen()
      .pipe(map((response) => response.data?.cmAssets));
    super(query$, listener$);
  }
}
