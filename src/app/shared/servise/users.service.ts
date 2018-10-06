import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

import {User} from "../models/user.model";
import {BaseApi} from "../core/base-api";


@Injectable({
  providedIn: 'root'
})

export class UsersService extends BaseApi {

  constructor( public _http: HttpClient ) {
    super(_http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(map(user => user[0] ? user[0] : undefined));;
  }

  createNewUser(user: User): Observable<any> {
    return this.post('users', user);
  }

}
