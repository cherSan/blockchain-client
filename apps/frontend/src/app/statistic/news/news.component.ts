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

  constructor(
    private gql: ApolloAngularSDK
  ) { }

}
