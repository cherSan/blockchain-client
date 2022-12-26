import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'coin-render',
  templateUrl: './coin-render.component.html',
  styleUrls: ['./coin-render.component.scss']
})
export class CoinRenderComponent implements ICellRendererAngularComp {
  title?: string;
  value?: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.data[params.value[0]];
    this.title = params.data[params.value[1]];
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
