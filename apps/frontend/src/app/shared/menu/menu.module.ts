import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { UserOutline, HomeOutline } from "@ant-design/icons-angular/icons";

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";

import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzInputModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule.forChild([
      UserOutline,
      HomeOutline
    ]),
    NzBreadCrumbModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
