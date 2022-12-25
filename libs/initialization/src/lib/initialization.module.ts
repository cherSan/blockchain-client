import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzIconModule } from 'ng-zorro-antd/icon';

import { UserModule } from "@blockchain_client/user";

import { InitializationComponent } from './initialization/initialization.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    NzIconModule,
    NzSpinModule,
    NzLayoutModule
  ],
  declarations: [
    InitializationComponent
  ],
  exports: [
    InitializationComponent
  ]
})
export class InitializationModule {}
