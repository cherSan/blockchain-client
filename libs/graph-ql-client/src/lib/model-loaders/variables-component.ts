import { EventEmitter, TemplateRef } from "@angular/core";
import { BehaviorSubject, catchError, ignoreElements, Observable, of, switchMap, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
export class ModelViewerVariablesComponent<T, P> {
  public template!: TemplateRef<{$implicit: T}>;
  public data?: null | T = undefined;
  public readonly error$!: Observable<GraphQLError>;
  public noDataMessage = "Sorry, but we didn't find any data.";
  protected data$: Observable<undefined | T>;
  public change!: EventEmitter<null | T>;
  protected variables$: BehaviorSubject<undefined | P> = new BehaviorSubject<undefined | P>(undefined)
  constructor(
    protected query$: (variables: P) => Observable<undefined | T>,
    protected listener$: (variables: P) => Observable<undefined | T>
  ) {
    this.data$ = this.variables$.pipe(
      switchMap((variables) => {
        if (!variables) return of(undefined);
        return query$(variables)
          .pipe(
            tap(data => {
              this.data = data || null;
              this.change.emit(this.data);
            }),
            switchMap(() => listener$(variables)),
            tap(data => {
              this.data = data || null;
              this.change.emit(this.data);
            })
          );
      })
    )
    this.error$ = this.data$.pipe(
      ignoreElements(),
      catchError((err) => of(err))
    )
  }
  setTemplate(template: TemplateRef<{$implicit: T}>) {
    this.template = template;
  }
}
