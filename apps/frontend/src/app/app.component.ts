import { Component } from '@angular/core';
import { IUserMutationService } from "../../../../libs/graph-ql-client/src/lib/graph-ql.service";

@Component({
  selector: 'ant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private userService: IUserMutationService
  ) {
  }

  setValue($event: Event) {
    this.title = ($event?.target as any)?.value
  }

  send() {
    this.userService.mutate({
      title: this.title
    }).subscribe()
  }
}
