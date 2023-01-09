import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CmAssetsLastPriceLoaderDirective } from './directive';
import { CmAssetsLastPriceLoaderComponent } from './component';
@NgModule({
  declarations: [
    CmAssetsLastPriceLoaderDirective,
    CmAssetsLastPriceLoaderComponent,
  ],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [CmAssetsLastPriceLoaderDirective, CmAssetsLastPriceLoaderComponent],
})
export class CmAssetsLastPriceLoaderModule {}
