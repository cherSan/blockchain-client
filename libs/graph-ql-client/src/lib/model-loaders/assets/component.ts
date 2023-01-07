import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { AssetsLoaderType } from './type';
@Component({
  selector: 'ldr-assets',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class AssetsLoaderComponent extends ModelViewerComponent<AssetsLoaderType> {
  @Output()
  public override change: EventEmitter<null | AssetsLoaderType> =
    new EventEmitter<null | AssetsLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .assetsGet()
      .pipe(map((response) => response.data?.assets));
    const listener$ = gql
      .assetsListen()
      .pipe(map((response) => response.data?.assets));
    super(query$, listener$);
  }
}
