import { Component } from '@angular/core';
import { map } from "rxjs";
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { ModelViewerComponent } from "../components";
import { News } from "./news";

@Component({
  selector: 'mdl-news',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss']
})
export class NewsComponent extends ModelViewerComponent<News> {
  protected override query$ = this.gql.newsData().pipe(
    map(response => response.data?.newsData)
  );
  protected override listener$ = this.gql.listenNewsData().pipe(
    map(response => response.data?.newsData)
  );
  public override noDataMessage = "Sorry, but we didn't find any news.";
  public override title = 'News';
  constructor(
    private gql: ApolloAngularSDK
  ) {
    super()
  }
}
