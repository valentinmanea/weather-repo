import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';;
import {User} from "../model/model.user";
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  constructor(public http: HttpClient, private router:Router) { }
  currentUser:User;

  public isUserLoggedIn():boolean{
    return window.localStorage.getItem('currentUser') != undefined;
  }
  public logIn(user: User){
    console.log('user',user)
    var base64Credential: string = btoa( user.username+ ':' + user.password);
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Basic " + base64Credential }),
      observe: 'response' as 'response'
    };
    return this.http.get("http://localhost:8080/auth/login", httpOptions)
  }

  logOut() {
    window.localStorage.clear();
    return this.http.post("http://localhost:8080/logout",{})
      .subscribe((response: Response) => {
        window.localStorage.clear();
      });

  }
 
}
