import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPangeComponent } from './main-pange/main-pange.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: MainPangeComponent
  }
]

@NgModule({
  declarations: [
    MainPangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
