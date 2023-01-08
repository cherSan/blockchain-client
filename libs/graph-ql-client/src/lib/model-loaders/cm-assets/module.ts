import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CmAssetsLoaderDirective } from './directive';
import { CmAssetsLoaderComponent } from './component';
@NgModule({
  declarations: [CmAssetsLoaderDirective, CmAssetsLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [CmAssetsLoaderDirective, CmAssetsLoaderComponent],
})
export class CmAssetsLoaderModule {}
