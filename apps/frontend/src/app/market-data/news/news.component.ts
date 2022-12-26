import { Component } from '@angular/core';
import {
  ApolloAngularSDK,
  IListenNewsDataSubscription,
  INewsDataQuery
} from "@blockchain_client/graph-ql-client";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";

type News = INewsDataQuery['newsData'] | IListenNewsDataSubscription['newsData'];
@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  data: undefined | News["data"];
  update_at: undefined | News["update_at"]
  data$: Observable<undefined | News> = this.gql.newsData().pipe(
    map(response => response.data?.newsData),
    tap(data => {
      this.data = data?.data;
      this.update_at = data?.update_at
    }),
    switchMap(() => this.gql.listenNewsData()),
    map(response => response.data?.newsData),
    tap(data => {
      this.data = data?.data;
      this.update_at = data?.update_at
    }),
  );

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )

  constructor(
    private gql: ApolloAngularSDK
  ) { }
}
