import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PoolEtcMinersLoaderDirective } from './directive';
import { PoolEtcMinersLoaderComponent } from './component';
@NgModule({
  declarations: [PoolEtcMinersLoaderDirective, PoolEtcMinersLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [PoolEtcMinersLoaderDirective, PoolEtcMinersLoaderComponent],
})
export class PoolEtcMinersLoaderModule {}
