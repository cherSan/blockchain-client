import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PoolEtcPaymentsLoaderDirective } from './directive';
import { PoolEtcPaymentsLoaderComponent } from './component';
@NgModule({
  declarations: [
    PoolEtcPaymentsLoaderDirective,
    PoolEtcPaymentsLoaderComponent,
  ],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [PoolEtcPaymentsLoaderDirective, PoolEtcPaymentsLoaderComponent],
})
export class PoolEtcPaymentsLoaderModule {}
