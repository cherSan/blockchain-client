import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ApolloAngularSDK,
  IListenMinerstatsCoinsQuery,
  IMinerstatsCoinsQuery
} from "@blockchain_client/graph-ql-client";
import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { CoinRenderComponent } from "../../shared/grid/coin-render/coin-render.component";

type Coins = IMinerstatsCoinsQuery["coins"] | IListenMinerstatsCoinsQuery["coins"]

@Component({
  selector: 'statistic-grid',
  templateUrl: './statistic-grid.component.html',
  styleUrls: ['./statistic-grid.component.css']
})
export class StatisticGridComponent {
  public data: undefined | Coins;
  public columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    {
      field: 'coin',
      filter: true,
      headerName: '',
      floatingFilter: true,
      width: 170,
      minWidth: 170,
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        params: {
          value: ['coin', 'name']
        },
        component: CoinRenderComponent,
      })
    },
    {
      minWidth: 90,
      field: 'algorithm',
    },
    {
      minWidth: 90,
      field: 'price',
      type: 'ChangeDetection',
      headerName: 'Price (USD)',
      valueFormatter: (params) => params.value.toFixed(8),
    },
    {
      minWidth: 90,
      field: 'network_hashrate',
      type: 'ChangeDetection',
      headerName: 'Network Hashrate',
      sort: 'desc',
      comparator: (valueA, valueB) => {
        return parseFloat(valueA) - parseFloat(valueB)
      }
    },
    {
      minWidth: 90,
      field: 'difficulty',
      type: 'ChangeDetection',
      headerName: 'Difficulty'
    }
  ]

  private data$: Observable<undefined | Coins> = this.gql.minerstatsCoins().pipe(
    map(response => response.data?.coins),
    tap(data => this.data = this.filterData(data)),
    switchMap(() => this.gql.listenMinerstatsCoins()),
    map(response => response.data?.coins),
    tap(data => this.data = this.filterData(data)),
  );

  public error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  )

  constructor(
    private gql: ApolloAngularSDK,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  private filterData(data: Coins): Coins {
    return data.filter((v) =>
      v.network_hashrate !== -1 &&
      v.difficulty !== -1 &&
      v.price !== -1 &&
      v.price !== 0
    )
  }

  onRowClick($event: RowClickedEvent<Coins[number]>) {
    return this.router.navigate([$event.data?.coin, $event.data?.algorithm], {relativeTo: this.activeRoute})
  }
}
