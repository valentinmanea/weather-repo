import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscribeService {

  constructor(private http:HttpClient) { }
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  addSubscription(city:string):any{
    return this.http.post('http://localhost:8080/subscription/add',{'locationName':city});
  }

  getAllSubscriptionsForCurrentUser():any{
    return this.http.get('http://localhost:8080/subscription/current-user/all');
  }
  changeStatus(subscription):any{
    return this.http.post('http://localhost:8080/subscription/current-user/status', subscription, this.options);
  }

}
