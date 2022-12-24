import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NzSpinModule } from "ng-zorro-antd/spin";

import { UserModule } from "@blockchain_client/user";

import { InitializationComponent } from './initialization/initialization.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    NzSpinModule
  ],
  declarations: [
    InitializationComponent
  ],
  exports: [
    InitializationComponent
  ]
})
export class InitializationModule {}
