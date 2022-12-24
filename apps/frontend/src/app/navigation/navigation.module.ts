import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { InitializationComponent, InitializationGuard } from "@blockchain_client/initialization";
import { RoleGuard, Roles } from "@blockchain_client/user";

const routes: Routes = [
  {
    path: '',
    component: InitializationComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../statistic/statistic.module').then(m => m.StatisticModule),
    canActivate: [InitializationGuard, RoleGuard],
    data: {
      roles: [Roles.UNAUTHORIZED, Roles.AUTHORIZED, Roles.REGISTERED]
    }
  },
  {
    path: 'home2',
    loadChildren: () => import('../statistic/statistic.module').then(m => m.StatisticModule),
    canActivate: [InitializationGuard, RoleGuard],
    data: {
      roles: [Roles.UNAUTHORIZED, Roles.AUTHORIZED, Roles.REGISTERED]
    }
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
