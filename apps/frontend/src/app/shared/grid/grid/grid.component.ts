import { ChangeDetectionStrategy, Component, HostListener, Input } from "@angular/core";
import { ColDef, GetRowIdParams, GridReadyEvent } from "ag-grid-community";

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {

  @HostListener('window:resize', ['$event'])
  resize = () => {}

  @Input()
  title?: string = undefined;

  @Input()
  extra?: string = undefined;

  @Input()
  error?: string = undefined;

  @Input()
  rowData?: any[] | null;

  @Input()
  public columnDefs?: ColDef[]

  @Input()
  public defaultColDef: ColDef = {
    sortable: false,
    filter: false,
    editable: false,
    suppressMenu: true
  };

  public columnTypes: {
    [key: string]: ColDef;
  } = {
    ChangeDetection: {
      editable: false,
      aggFunc: 'sum',
      valueParser: 'Number(newValue)',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellStyle: { textAlign: 'right' },
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        return parseFloat(params.value).toFixed(4).toString()
      },
    }
  };

  getRowId(params: GetRowIdParams) {
    return params.data.id
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.resize = params.api.sizeColumnsToFit.bind(params.api);
  }
}
