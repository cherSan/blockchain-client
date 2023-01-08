import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CmAssetsPriceHistoryLoaderDirective } from './directive';
import { CmAssetsPriceHistoryLoaderComponent } from './component';
@NgModule({
  declarations: [
    CmAssetsPriceHistoryLoaderDirective,
    CmAssetsPriceHistoryLoaderComponent,
  ],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [
    CmAssetsPriceHistoryLoaderDirective,
    CmAssetsPriceHistoryLoaderComponent,
  ],
})
export class CmAssetsPriceHistoryLoaderModule {}
