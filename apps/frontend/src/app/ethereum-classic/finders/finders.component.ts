import { Component } from '@angular/core';
import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
import { LinkRenderComponent } from "../../shared/grid/link-render/link-render.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'finders',
  templateUrl: './finders.component.html',
  styleUrls: ['./finders.component.css']
})
export class FindersComponent {
  dataColDef: ColDef[] = [
    {
      field: 'address',
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        component: LinkRenderComponent,
      }),
      onCellClicked: this.onClick.bind(this)
    },
    {
      field: 'blocks',
      maxWidth: 80
    }
  ]
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onClick($event: RowClickedEvent<any>) {
    return this.router.navigate(['.', 'miners', $event.data.address], {relativeTo: this.activeRoute.parent})
  }
}
