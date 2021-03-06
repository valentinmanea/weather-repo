import { map } from 'rxjs/operators';
import { CityService } from './../../services/CityService';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities;

  constructor(private cityService: CityService) {
  }

  ngOnInit() {
     this.cityService.getAllFavouriteCityForCurrentUser().subscribe(response => this.cities = response);
  }
  removeFromList(event){
    console.log(event)
    this.cities = this.cities.filter(city=>city != event)
  }
}
