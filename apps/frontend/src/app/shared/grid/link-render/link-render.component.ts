import { Component } from '@angular/core';
import { ICellRendererParams } from "ag-grid-community";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'link-render',
  templateUrl: './link-render.component.html',
  styleUrls: ['./link-render.component.scss']
})
export class LinkRenderComponent implements ICellRendererAngularComp {
  value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
