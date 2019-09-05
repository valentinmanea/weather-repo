import { ImageService } from './../../services/image.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import { SubscribeService } from 'src/app/services/subscribe.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  darkMode: boolean;
  city: string;
  state: string;
  temp: number;
  hum: number;
  dayWind: string;
  nightWind: string;
  today: string;
  daysForecast: Object; 
  cityIllustrationPath: string;
  errorMessage: string;

  successMessage;

  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService, 
    private imageService:ImageService, private subscribeService:SubscribeService) {

  }

  ngOnInit() {
    this.activeRouter.params.subscribe(response=> this.city = response.city)
    this.imageService.getImage(this.city).subscribe(response=> {
      console.log(response.body.photos[0])
      this.cityIllustrationPath = response.body.photos[0].src.landscape;
    })
    this.weather.getWeather(this.city)
      .subscribe((payload) => {
        console.log(payload)
        this.temp = payload.Temperature.Metric.Value;
        this.state = payload.WeatherText;
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
    this.weather.getForecast(this.city).subscribe(response => {
      console.log(response);
      this.dayWind = response.DailyForecasts[0].Day.Wind.Speed.Value + '' + response.DailyForecasts[0].Day.Wind.Speed.Unit;
      this.nightWind = response.DailyForecasts[0].Night.Wind.Speed.Value + '' + response.DailyForecasts[0].Night.Wind.Speed.Unit;

    })
  }

  subscribe(){
    this.subscribeService.addSubscription(this.city).subscribe(response=>{
      this.successMessage='Subscription added'
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
}
