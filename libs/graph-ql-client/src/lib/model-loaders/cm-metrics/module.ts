import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CmMetricsLoaderDirective } from './directive';
import { CmMetricsLoaderComponent } from './component';
@NgModule({
  declarations: [CmMetricsLoaderDirective, CmMetricsLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [CmMetricsLoaderDirective, CmMetricsLoaderComponent],
})
export class CmMetricsLoaderModule {}
