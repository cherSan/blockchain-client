import { Component } from '@angular/core';
import { ApolloAngularSDK } from "@blockchain_client/graph-ql-client";
import { map, switchMap } from "rxjs";

@Component({
  selector: 'ant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  users$;

  constructor(
    private sdk: ApolloAngularSDK
  ) {
    this.users$ = sdk.usersWatch().valueChanges.pipe(
      map(value => value?.data?.users)
    )
  }

  setValue($event: Event) {
    this.title = ($event?.target as any)?.value
  }

  send() {
    this.sdk.user({
      user: {
        title: this.title
      }
    })
      .pipe(
        switchMap(() => {
          return this.sdk.usersWatch().refetch()
        })
      )
      .subscribe()
  }
}
