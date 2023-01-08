import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CmAssetsHistoryLoaderDirective } from './directive';
import { CmAssetsHistoryLoaderComponent } from './component';
@NgModule({
  declarations: [
    CmAssetsHistoryLoaderDirective,
    CmAssetsHistoryLoaderComponent,
  ],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [CmAssetsHistoryLoaderDirective, CmAssetsHistoryLoaderComponent],
})
export class CmAssetsHistoryLoaderModule {}
