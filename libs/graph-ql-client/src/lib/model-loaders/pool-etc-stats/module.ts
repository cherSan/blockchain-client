import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PoolEtcStatsLoaderDirective } from './directive';
import { PoolEtcStatsLoaderComponent } from './component';
@NgModule({
  declarations: [PoolEtcStatsLoaderDirective, PoolEtcStatsLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [PoolEtcStatsLoaderDirective, PoolEtcStatsLoaderComponent],
})
export class PoolEtcStatsLoaderModule {}
