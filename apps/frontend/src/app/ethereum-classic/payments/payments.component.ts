import { Component } from '@angular/core';
import { ColDef, RowClickedEvent } from "ag-grid-community";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  public columnDef: ColDef[] = [
    {
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: (params) => moment(params.value).format('L LTS'),
      minWidth: 160,
      maxWidth: 160,
    },
    {
      field: 'amount',
      minWidth: 120,
      maxWidth: 120,
      type: 'CoinAmount',
    },
    {
      field: 'address'
    },
    {
      headerName: 'Tx ID',
      field: 'tx'
    }
  ]
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onRowClick($event: RowClickedEvent<any>) {
    return this.router.navigate(['.', 'miners', $event.data?.address], {relativeTo: this.activeRoute.parent})
  }
}
