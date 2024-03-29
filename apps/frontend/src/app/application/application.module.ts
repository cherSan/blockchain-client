import { NgModule } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";

import { LayoutsModule } from "@blockchain_client/ui/layouts";

import { ApplicationLayoutComponent } from './application-layout/application-layout.component';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzBackTopModule } from "ng-zorro-antd/back-top";



@NgModule({
  declarations: [
    ApplicationLayoutComponent
  ],
  imports: [
    RouterOutlet,
    LayoutsModule,
    NzMenuModule,
    NzIconModule,
    NzLayoutModule,
    NzBackTopModule
  ],
  exports: [
    ApplicationLayoutComponent
  ]
})
export class ApplicationModule { }
