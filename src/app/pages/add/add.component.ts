import { CityService } from './../../services/CityService';
import {Component, OnDestroy, OnInit, ɵConsole} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather/weather.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  temp: number;
  city = 'Rome';
  state: string;
  capitals = [];
  selectedCity;
  cardCity;
  showNote = false;
  followedCM = false;
  sub1;


  constructor(public http: HttpClient, public weather: WeatherService, private cityService: CityService) {
  }

  ngOnInit() {
    this.weather.getWeather('Rome').subscribe(response => {
      console.log(response);
      this.state = response.WeatherText;
      this.temp = response.Temperature.Metric.Value;
    })
    this.http.get('https://restcountries.eu/rest/v2/all').pipe((first())).subscribe((countries: Array<any>) => {
      countries.forEach((country: any) => {
        if (country.capital.length) {
          this.capitals.push(country.capital);
        }
      });
      console.log(this.capitals);
      this.capitals.sort();
    });
    

    // this.sub1 = this.fb.getCities().subscribe((cities) => {
    //   Object.values(cities).forEach((city: any) => {
    //     if (city.name === 'Rome') {
    //       this.followedCM = true;
    //     }
    //   });
    // });
  }

  selectCity(city) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }
}
