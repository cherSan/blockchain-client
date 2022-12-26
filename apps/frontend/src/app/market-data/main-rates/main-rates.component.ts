import { Component } from '@angular/core';
import { ApolloAngularSDK, IAssetsQuery, IListenAssetsSubscription } from "@blockchain_client/graph-ql-client";
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";

type AssetsType = IAssetsQuery["assets"] | IListenAssetsSubscription["assets"];
@Component({
  selector: 'main-rates',
  templateUrl: './main-rates.component.html',
  styleUrls: ['./main-rates.component.scss']
})
export class MainRatesComponent {
  public data: undefined | AssetsType;

  data$: Observable<undefined | AssetsType> = this.gql.assets().pipe(
    map(response => response.data?.assets),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenAssets()),
    map(response => response.data?.assets),
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
