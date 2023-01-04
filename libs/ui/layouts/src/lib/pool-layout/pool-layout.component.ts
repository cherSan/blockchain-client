import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'lo-pool',
  templateUrl: './pool-layout.component.html',
  styleUrls: ['./pool-layout.component.scss']
})
export class PoolLayoutComponent {
  @Input()
  public title: string = '';

  @Input()
  public code: string = '';

  @Input()
  public error: any = '';

  constructor(
    public activeRoute: ActivatedRoute
  ) {
  }
}
