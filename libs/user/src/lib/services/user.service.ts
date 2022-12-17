import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Roles } from "../enums/roles";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private role: BehaviorSubject<Roles> = new BehaviorSubject<Roles>(Roles.ANON);
  public role$ = this.role.asObservable();

  constructor() { }

  checkUser(): Observable<Roles> {
    this.role.next(Roles.UNAUTHORIZED);
    return this.role$
  }
}
