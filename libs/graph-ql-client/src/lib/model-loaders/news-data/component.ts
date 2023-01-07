import { Component } from '@angular/core';
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
  protected override query$ = this.gql
    .newsDataGet()
    .pipe(map((response) => response.data?.newsData));
  protected override listener$ = this.gql
    .newsDataListen()
    .pipe(map((response) => response.data?.newsData));
  public override noDataMessage = "Sorry, but we didn't find any data.";
  constructor(private gql: ApolloAngularSDK) {
    super();
  }
}
