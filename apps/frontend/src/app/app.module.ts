import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { GraphQlClientModule } from "@blockchain_client/graph-ql-client";
import { LayoutsModule } from "@blockchain_client/ui/layouts";
import { UiModule } from "@blockchain_client/ui";

import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([], { initialNavigation: "enabledBlocking" }),
    GraphQlClientModule,
    UiModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    LayoutsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
