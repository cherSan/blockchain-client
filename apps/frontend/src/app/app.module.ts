import { NgModule } from "@angular/core";

import { GraphQlClientModule } from "@blockchain_client/graph-ql-client";
import { UiModule } from "@blockchain_client/ui";
import { INITIALIZE_ROUTE, DEFAULT_ROUTE, InitializationModule } from "@blockchain_client/initialization";
import { UserModule } from "@blockchain_client/user";

import { AppComponent } from './app.component';
import { NavigationModule } from "./navigation/navigation.module";
import { ApplicationModule } from "./application/application.module";
import { ModelViewerModule } from "./model-viewer/model-viewer.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GraphQlClientModule,
    UiModule,
    NavigationModule,
    InitializationModule,
    ApplicationModule,
    UserModule,
    ModelViewerModule
  ],
  providers: [
    { provide: DEFAULT_ROUTE, useValue: ['/'] },
    { provide: INITIALIZE_ROUTE, useValue: ['/', 'initialization'] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
