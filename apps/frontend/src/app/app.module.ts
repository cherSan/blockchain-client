import { NgModule } from "@angular/core";

import { GraphQlClientModule } from "@blockchain_client/graph-ql-client";
import { UiModule } from "@blockchain_client/ui";
import { DEFAULT_ROUTE, InitializationModule } from "@blockchain_client/initialization";
import { UserModule } from "@blockchain_client/user";

import { AppComponent } from './app.component';
import { NavigationModule } from "./navigation/navigation.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GraphQlClientModule,
    UiModule,
    NavigationModule,
    InitializationModule,
    UserModule
  ],
  providers: [
    { provide: DEFAULT_ROUTE, useValue: '/home' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
