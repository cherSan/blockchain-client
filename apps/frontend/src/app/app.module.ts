import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    NoopAnimationsModule,
    RouterModule.forRoot([], { initialNavigation: "enabledBlocking" }),
    NzDropDownModule,
    NzIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
