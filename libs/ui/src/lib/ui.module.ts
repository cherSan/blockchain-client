import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NZ_I18N, ru_RU } from "ng-zorro-antd/i18n";
registerLocaleData(ru);

@NgModule({
  imports: [
    BrowserAnimationsModule
  ],
  providers   : [
    { provide: NZ_I18N, useValue: ru_RU }
  ]
})
export class UiModule {}
