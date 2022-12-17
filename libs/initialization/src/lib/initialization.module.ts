import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzIconModule } from 'ng-zorro-antd/icon';

import { InitializationComponent } from './initialization/initialization.component';
import { InitializationService } from "./services/initialization.service";
import { UserModule } from "@blockchain_client/user";
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    NzSpinModule,
    NzIconModule,
  ],
  declarations: [
    InitializationComponent
  ],
  exports: [
    InitializationComponent
  ]
})
export class InitializationModule {}
