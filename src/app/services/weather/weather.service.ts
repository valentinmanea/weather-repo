import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseURL = 'http://localhost:8080/';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = 'Weather';

  constructor(public http: HttpClient) {
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.baseURL+"temperature/?cityName=" + city);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(this.baseURL +"/forecast-by-text/?text" + city);
  }

  // [0].main
  // getWeatherState
  //
  // getCurrentTemp
  // Math.round(Number(weather.main.temp))
  //
  //
  // getCurrentHum
  // weather.main.humidity
  //
  //
  // getCurrentWind
  // Math.round(Math.round(weather.wind.speed))


}
