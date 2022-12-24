import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ColDef } from "ag-grid-community";
import {
  ApolloAngularSDK,
  IListenRatesSubscription,
  IRatesQuery,
} from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent {

  public columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'symbol', sort: 'asc', sortIndex: 2, filter: true, floatingFilter: true, suppressFiltersToolPanel: true},
    { field: 'currencySymbol'},
    { field: 'type', sort: 'asc', sortIndex: 1 },
    {
      field: 'rateUsd',
      type: 'ChangeDetection'
    },
  ];

  data: undefined | IRatesQuery["rates"] | IListenRatesSubscription["rates"];

  data$: Observable<undefined | IRatesQuery["rates"] | IListenRatesSubscription["rates"]> = this.gql.rates().pipe(
    map(response => response.data?.rates),
    tap(data => this.data = data),
    switchMap(() => this.gql.listenRates()),
    map(response => response.data?.rates),
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
