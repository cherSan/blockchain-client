import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { InitializationComponent, InitializationGuard } from "@blockchain_client/initialization";
import { RoleGuard, Roles } from "@blockchain_client/user";

import { ApplicationLayoutComponent } from "../application/application-layout/application-layout.component";

const routes: Routes = [
  {
    path: 'initialization',
    component: InitializationComponent
  },
  {
    path: '',
    component: ApplicationLayoutComponent,
    canActivate: [InitializationGuard, RoleGuard],
    data: {
      roles: [Roles.UNAUTHORIZED, Roles.AUTHORIZED, Roles.REGISTERED]
    },
    children: [
      {
        path: '',
        redirectTo: 'statistic',
        pathMatch: 'full'
      },
      {
        path: 'statistic',
        loadChildren: () => import('../statistic/statistic.module').then(m => m.StatisticModule)
      },
      {
        path: 'ethereum-classic',
        loadChildren: () => import('../ethereum-classic/ethereum-classic.module').then(m => m.EthereumClassicModule)
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NavigationModule { }
