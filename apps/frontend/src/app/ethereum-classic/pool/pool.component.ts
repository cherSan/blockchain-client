import { Component } from '@angular/core';
@Component({
  selector: 'pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent {
  tracker(index: number, node: any) {
    return node.name
  }
}
