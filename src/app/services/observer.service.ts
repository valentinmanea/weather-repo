import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';;
import {AppComponent} from "../app.component";
import { User } from '../model/model.user';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ObserverService {
    private subject = new Subject<any>();
    
    constructor() { }
    notify(value: boolean) {
        this.subject.next({ flag: true });
    }

    clearSubject() {
        this.subject.next();
    }

    getNotification(): Observable<any> {
        return this.subject.asObservable();
    }
}
