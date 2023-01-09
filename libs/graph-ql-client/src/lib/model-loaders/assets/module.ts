import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AssetsLoaderDirective } from './directive';
import { AssetsLoaderComponent } from './component';
@NgModule({
  declarations: [AssetsLoaderDirective, AssetsLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [AssetsLoaderDirective, AssetsLoaderComponent],
})
export class AssetsLoaderModule {}
