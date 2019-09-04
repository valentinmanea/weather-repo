import { CityService } from './../../services/CityService';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input() set city(city: string) {
    this.cityName = city;
    this.weather.getWeather(city)
      .subscribe((payload) => {
        console.log(payload)
        this.temp = payload.Temperature.Metric.Value;
        this.maxTemp = payload.TemperatureSummary.Past6HourRange.Maximum.Metric.Value;
        this.minTemp = payload.TemperatureSummary.Past6HourRange.Minimum.Metric.Value;
        this.state = payload.WeatherText;
        // this.state = payload.weather[0].main;
        // this.temp = Math.ceil(payload.main.temp);
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  }

  @Input() addMode;
  @Output() cityStored = new EventEmitter();
  citesWeather: Object;
  @Output() cityRemoved = new EventEmitter();

  darkMode: boolean;
  sub1: Subscription;
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  errorMessage: string;
  cityName;
  cityAdded = false;
  successMessage;

  constructor(public weather: WeatherService,
              public router: Router,
              public cityService:CityService) {
  }

  ngOnInit() {
  }


  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    console.log(this.cityName)
    this.cityService.addFavouriteCity(this.cityName).subscribe(response => {
      this.successMessage='City ' + this.cityName + ' was added to favourites!'
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);   
     },
     (err) => {
       console.log('a ajuns pe aici',err.error)
       if(err.error.errorMessage){
         this.errorMessage = err.error.errorMessage;
       }else if(err.error.message){
        this.errorMessage = err.error.message;
       }
       console.log(this.errorMessage)
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    })
  }
  removeCity(){
    this.cityService.removeFavouriteCity(this.cityName).subscribe(response => {
      this.successMessage='City ' + this.cityName + ' was removed to favourites!'
      this.emitWhenRemoved();
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);   
    }),
    (err) => {
      console.log(err.error)
      if(err.error.errorMessage){
        this.errorMessage = err.error.errorMessage;
      }else if(err.error.message){
       this.errorMessage = err.error.message;
      }
      console.log(this.errorMessage)
     setTimeout(() => { 
       this.errorMessage = '';
     }, 3000);
    }
  }
  showSun(){
    if(this.state){
      return this.state.toLowerCase().indexOf('sunny') > -1 || this.state.toLowerCase().indexOf('clear') > -1 
    }
    return false;
  }

  showCloud(){
    if(this.state){
      return this.state.toLowerCase().indexOf('cloud') > -1 
    }
    return false;
  }
  showRain(){
    if(this.state){
      return this.state.toLowerCase().indexOf('rain') > -1 || this.state.toLowerCase().indexOf('drizzle') > -1 || this.state.toLowerCase().indexOf('mist') > -1 
    }
    return false;
  }

  showFog(){
    if(this.state){
      return this.state.toLowerCase().indexOf('haze') > -1 || this.state.toLowerCase().indexOf('fog') > -1
     }
     return false;
  }
  showStorm(){
    if(this.state){
      return this.state.toLowerCase().indexOf('storm') > -1
     }
     return false;

  }
  emitWhenRemoved(){
    console.log('emit' + this.cityName)
    this.cityRemoved.emit(this.cityName);
  }
}
