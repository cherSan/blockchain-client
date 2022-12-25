import { Component } from '@angular/core';
import {
  ApolloAngularSDK,
  ICryptoNewsQuery,
  IListenCryptoNewsSubscription,
} from "@blockchain_client/graph-ql-client";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";

type CryptoNews = ICryptoNewsQuery['hotNews'] | IListenCryptoNewsSubscription['hotNews'];
@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  data: undefined | CryptoNews;
  page = 1;
  records = 2;
  data$: Observable<undefined | CryptoNews> = this.gql.cryptoNews().pipe(
    map(response => response.data?.hotNews),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenCryptoNews()),
    map(response => response.data?.hotNews),
    tap(data => this.data = data),
  );

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )

  get pagedData(): CryptoNews["results"] {
    const from = (this.page - 1) * this.records;
    const to = from + this.records;
    return (this.data?.results || []).slice(from, to);
  }

  constructor(
    private gql: ApolloAngularSDK
  ) { }

  onPageIndexChange(page: number) {
    this.page = page;
  }
}
