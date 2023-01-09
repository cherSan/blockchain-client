import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { CoinRenderComponent } from "../../shared/grid/coin-render/coin-render.component";
@Component({
  selector: 'assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent {

  public columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    {
      field: 'rank',
      type: 'Number',
      sort: 'asc',
      sortIndex: 1,
      maxWidth: 80,
      comparator: (valueA, valueB) => {
        return parseFloat(valueA) - parseFloat(valueB)
      }
    },
    {
      field: 'symbol',
      filter: true,
      floatingFilter: true,
      headerName: '',
      width: 170,
      minWidth: 170,
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        params: {
          value: ['symbol', 'name']
        },
        component: CoinRenderComponent,
      })
    },
    {
      minWidth: 90,
      field: 'priceUsd',
      type: 'Price',
      headerName: 'Price (USD)'
    },
    {
      minWidth: 90,
      field: 'changePercent24Hr',
      type: 'ChangeDetection',
      cellClass: (params) => {
        return parseFloat(params.value) < 0 ? 'ag-grid-lost-position' : 'ag-grid-win-position'
      },
      headerName: 'Change (24hr)'
    },
    {
      minWidth: 90,
      field: 'marketCapUsd',
      type: 'ChangeDetection',
      headerName: 'Market Cap (USD)'
    },
    {
      minWidth: 90,
      field: 'vwap24Hr',
      type: 'ChangeDetection',
      headerName: 'VWAP (24hr)'
    },
    {
      minWidth: 90,
      field: 'volumeUsd24Hr',
      type: 'ChangeDetection',
      headerName: 'Volume (24hr)'
    },
  ];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  onRowClick($event: RowClickedEvent<any>) {
    return this.router.navigate([$event.data?.symbol], {relativeTo: this.activeRoute})
  }
}
