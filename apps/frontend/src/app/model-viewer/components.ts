import { catchError, ignoreElements, Observable, of, switchMap, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
import { Component, EventEmitter, OnInit, Output, TemplateRef } from "@angular/core";
@Component({
  template: ''
})
export class ModelViewerComponent<T> implements OnInit {
  template!: TemplateRef<{$implicit: T}>;
  protected query$!: Observable<undefined | T>;
  protected listener$!: Observable<undefined | T>;
  protected data$!: Observable<undefined | T>;
  public data?: null | T = undefined;
  public error$!: Observable<GraphQLError>;
  public noDataMessage = "Sorry, but we didn't find anything.";
  public title = '';
  @Output()
  change: EventEmitter<T | null> = new EventEmitter<T | null>()
  ngOnInit() {
    this.data$ = this.query$
      .pipe(
        tap(data => {
          this.data = data || null;
          this.change.emit(this.data);
        }),
        switchMap(() => this.listener$),
        tap(data => {
          this.data = data || null;
          this.change.emit(this.data);
        })
      );

    this.error$ = this.data$.pipe(
      ignoreElements(),
      catchError((err) => of(err))
    )
  }
  setTemplate(template: TemplateRef<{$implicit: T}>) {
    this.template = template;
  }
}
