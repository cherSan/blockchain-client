import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { GraphQlClientModule } from "@untitled3/graph-ql-client";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    NoopAnimationsModule,
    RouterModule.forRoot([], { initialNavigation: "enabledBlocking" }),
    GraphQlClientModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
