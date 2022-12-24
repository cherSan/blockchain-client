import { NgModule } from '@angular/core';
import { SiSymbolPipe } from './si-symbol.pipe';



@NgModule({
  declarations: [
    SiSymbolPipe
  ],
  exports: [
    SiSymbolPipe
  ]
})
export class PipesModule { }
