import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NewsDataLoaderDirective } from './directive';
import { NewsDataLoaderComponent } from './component';
@NgModule({
  declarations: [NewsDataLoaderDirective, NewsDataLoaderComponent],
  imports: [
    NzEmptyModule,
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    NzSkeletonModule,
    NzResultModule,
  ],
  exports: [NewsDataLoaderDirective, NewsDataLoaderComponent],
})
export class NewsDataLoaderModule {}
