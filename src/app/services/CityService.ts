import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(public http: HttpClient) {
  }
  getCities():any { 
    return this.http.get('http://localhost:8080/country/capitals/all');
  }
}
