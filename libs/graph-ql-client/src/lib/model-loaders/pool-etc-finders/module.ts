import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PoolEtcFindersLoaderDirective } from './directive';
import { PoolEtcFindersLoaderComponent } from './component';
@NgModule({
  declarations: [PoolEtcFindersLoaderDirective, PoolEtcFindersLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [PoolEtcFindersLoaderDirective, PoolEtcFindersLoaderComponent],
})
export class PoolEtcFindersLoaderModule {}
