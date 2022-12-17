import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from "../utils/animation";
import { InitializationService } from "../services/initialization.service";

@Component({
  selector: 'initialization',
  templateUrl: './initialization.component.html',
  styleUrls: ['./initialization.component.scss'],
  animations: [slideInAnimation],
  host: { '[@routeAnimation]': '' }
})
export class InitializationComponent implements OnInit {

  constructor(
    private initialization: InitializationService
  ) { }

  ngOnInit(): void {
    this.initialization.run()
  }

}
