import { NgModule } from '@angular/core';
import { SiSymbolPipe } from './si-symbol.pipe';
import { MomentPipe } from './moment.pipe';
import { MomentDiffPipe } from './moment-diff.pipe';



@NgModule({
  declarations: [
    SiSymbolPipe,
    MomentPipe,
    MomentDiffPipe
  ],
  exports: [
    SiSymbolPipe,
    MomentPipe,
    MomentDiffPipe
  ]
})
export class PipesModule { }
