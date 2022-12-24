import { Component } from '@angular/core';

@Component({
  selector: 'main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss']
})
export class MainStatsComponent {

  stats = [{title: 'miners', value: 1000}, {title: 'hashrate', value: 1000},{title: 'miners', value: 1000}, {title: 'hashrate', value: 1000}];

  constructor() { }

  ngOnInit(): void {
  }

}
