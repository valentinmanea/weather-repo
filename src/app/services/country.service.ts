import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public http: HttpClient) {
  }
  getCountries():any { 
    return this.http.get('http://localhost:8080/country/all');
  }
}
