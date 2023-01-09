import { Component } from '@angular/core';
import { ColDef } from "ag-grid-community";
import * as moment from "moment/moment";
import { map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent {
  columnDefs: ColDef[] = [
    {
      field: 'id'
    },
    {
      field: 'hr',
      headerName: 'Hashrate (rough, short average)',
      type: 'ChangeDetection',
    },
    {
      field: 'hr2',
      headerName: 'Hashrate (accurate, long average)',
      type: 'ChangeDetection',
    },
    {
      field: 'blocks',
      type: 'ChangeDetection',
      maxWidth: 60
    },
    {
      field: 'valid',
      headerName: 'Valid / Stale / Invalid 24h',
      type: 'ChangeDetection',
      maxWidth: 140,
      valueFormatter: params => {
        return `${params.data.valid} / ${params.data.stale} / ${params.data.invalid}`
      }
    },
    {
      field: 'lastBeat',
      headerName: 'Last Share',
      valueFormatter: params => moment(params.value * 1000).fromNow()
    }
  ]
  userId$ = (this.activeRouter.parent?.params || of({})).pipe(
    map((data) => data["id"])
  )
  constructor(
    private activeRouter: ActivatedRoute,
  ) {

  }
}
