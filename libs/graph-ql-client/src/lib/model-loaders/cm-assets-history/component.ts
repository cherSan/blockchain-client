import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { CmAssetsHistoryLoaderType } from './type';
@Component({
  selector: 'ldr-cm-assets-history',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class CmAssetsHistoryLoaderComponent extends ModelViewerComponent<CmAssetsHistoryLoaderType> {
  @Output()
  public override change: EventEmitter<null | CmAssetsHistoryLoaderType> =
    new EventEmitter<null | CmAssetsHistoryLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .cmAssetsHistoryGet()
      .pipe(map((response) => response.data?.cmAssetsHistory));
    const listener$ = gql
      .cmAssetsHistoryListen()
      .pipe(map((response) => response.data?.cmAssetsHistory));
    super(query$, listener$);
  }
}
