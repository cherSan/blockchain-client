import { Component } from '@angular/core';
import { ColDef } from "ag-grid-community";
import * as moment from "moment";
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
    },
    {
      field: 'address'
    },
    {
      headerName: 'Tx ID',
      field: 'tx'
    }
  ]
}
