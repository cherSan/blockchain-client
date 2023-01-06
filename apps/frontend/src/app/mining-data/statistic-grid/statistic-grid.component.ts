import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { CoinRenderComponent } from "../../shared/grid/coin-render/coin-render.component";
@Component({
  selector: 'statistic-grid',
  templateUrl: './statistic-grid.component.html',
  styleUrls: ['./statistic-grid.component.css']
})
export class StatisticGridComponent {
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
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onRowClick($event: RowClickedEvent<any>) {
    return this.router.navigate([$event.data?.coin, $event.data?.algorithm], {relativeTo: this.activeRoute})
  }
}
