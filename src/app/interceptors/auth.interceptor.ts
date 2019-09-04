import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    storage = window.localStorage;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptat')
        let authorizationHeader = request.headers.get("Authorization");
        if(request.url.indexOf('restcountries') != -1){
            return next.handle(request);
        }
        if(authorizationHeader){
            if(authorizationHeader.indexOf('Basic') > -1){
                const copiedRequest = request.clone({headers: request.headers.set('Authorization', 'Basic ' + this.storage.getItem("auth"))});
                if(this.storage.getItem("auth")){
                    return next.handle(copiedRequest);
                }
            }
        }else{
            const copiedRequest = request.clone({headers: request.headers.set('Authorization', 'Basic ' + this.storage.getItem("auth"))});
            if(this.storage.getItem("auth")){
                return next.handle(copiedRequest);
            }
        }
       
        return next.handle(request);
    }
}
