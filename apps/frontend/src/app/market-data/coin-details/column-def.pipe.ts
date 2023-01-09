import { Pipe, PipeTransform } from '@angular/core';
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { CoinRenderComponent } from "../../shared/grid/coin-render/coin-render.component";

@Pipe({
  name: 'columnDef'
})
export class ColumnDefPipe implements PipeTransform {

  transform(symbol?: string | null): ColDef[] {
    if (!symbol) {
      return []
    }
    return [
      { field: 'id', hide: true },
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
        field: 'forward',
        type: 'ChangeDetection',
        headerName: symbol + ' / Coin*',
        valueFormatter: (params) => params.value.toFixed(8),
      },
      {
        field: 'backward',
        type: 'ChangeDetection',
        headerName: 'Coin* / ' + symbol,
        valueFormatter: (params) => params.value.toFixed(8),
      }
    ];
  }

}
