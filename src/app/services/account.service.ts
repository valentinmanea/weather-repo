import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';;
import {AppComponent} from "../app.component";
import { User } from '../model/model.user';

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }
  createAccount(user:User){
    return this.http.post('http://localhost:8080/auth/register',user)
  }
}
