import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { CmMetricsLoaderType } from './type';
@Component({
  selector: 'ldr-cm-metrics',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class CmMetricsLoaderComponent extends ModelViewerComponent<CmMetricsLoaderType> {
  @Output()
  public override change: EventEmitter<null | CmMetricsLoaderType> =
    new EventEmitter<null | CmMetricsLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .cmMetricsGet()
      .pipe(map((response) => response.data?.cmMetrics));
    const listener$ = gql
      .cmMetricsListen()
      .pipe(map((response) => response.data?.cmMetrics));
    super(query$, listener$);
  }
}
