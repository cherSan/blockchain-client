import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PoolEtcBlocksLoaderDirective } from './directive';
import { PoolEtcBlocksLoaderComponent } from './component';
@NgModule({
  declarations: [PoolEtcBlocksLoaderDirective, PoolEtcBlocksLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [PoolEtcBlocksLoaderDirective, PoolEtcBlocksLoaderComponent],
})
export class PoolEtcBlocksLoaderModule {}
