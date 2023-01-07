import { EventEmitter, TemplateRef } from "@angular/core";
import { catchError, ignoreElements, Observable, of, switchMap, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
export class ModelViewerComponent<T> {
  public template!: TemplateRef<{$implicit: T}>;
  public data?: null | T = undefined;
  public readonly error$!: Observable<GraphQLError>;
  public noDataMessage = "Sorry, but we didn't find any data.";
  private data$: Observable<undefined | T>;
  public change!: EventEmitter<null | T>;
  constructor(
    private readonly query$: Observable<undefined | T>,
    private readonly listener$: Observable<undefined | T>
  ) {
    this.data$ = query$
      .pipe(
        tap(data => {
          this.data = data || null;
          this.change.emit(this.data);
        }),
        switchMap(() => listener$),
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
