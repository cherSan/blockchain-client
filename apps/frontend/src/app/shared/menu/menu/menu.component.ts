import { Component, Input } from "@angular/core";

@Component({
  selector: 'top-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input()
  menu: any = [
    {
      label: 'Statistic',
      routerLink: ['/', 'home']
    },
    {
      label: 'Blocks',
    routerLink: ['/', 'home2']
    },
    {
      label: 'Payments',
    },
    {
      label: 'Miners',
    }
  ];
}
