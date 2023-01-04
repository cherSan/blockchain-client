import { NgModule } from '@angular/core';
import { SiSymbolPipe } from './si-symbol.pipe';
import { MomentPipe } from './moment.pipe';



@NgModule({
  declarations: [
    SiSymbolPipe,
    MomentPipe
  ],
  exports: [
    SiSymbolPipe,
    MomentPipe
  ]
})
export class PipesModule { }
