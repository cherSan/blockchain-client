import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApolloAngularSDK } from '@blockchain_client/graph-ql-client';
import { ModelViewerComponent } from '../components';
import { NewsDataLoaderType } from './type';
@Component({
  selector: 'ldr-news-data',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class NewsDataLoaderComponent extends ModelViewerComponent<NewsDataLoaderType> {
  @Output()
  public override change: EventEmitter<null | NewsDataLoaderType> =
    new EventEmitter<null | NewsDataLoaderType>();
  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .newsDataGet()
      .pipe(map((response) => response.data?.newsData));
    const listener$ = gql
      .newsDataListen()
      .pipe(map((response) => response.data?.newsData));
    super(query$, listener$);
  }
}
