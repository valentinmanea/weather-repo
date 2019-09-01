import { CountryService } from './../../services/country.service';
import { User } from './../../model/model.user';
import { AccountService } from './../../services/account.service';
import {Component, OnInit} from '@angular/core';
// import {FbService} from '../../services/fb/fb.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage;
  selectedCountry;
  countries

  constructor(public router: Router, private accountService:AccountService,
    private countryService:CountryService) {
  }

  ngOnInit() {
    this.selectedCountry = 'Select your country';
    this.countryService.getCountries().subscribe( response => this.countries = response)
  }

  signup(e) {
    let user = new User();
    user.country = this.selectedCountry;
    user.email = e.target.email.value;
    user.username = e.target.username.value
    user.password = e.target.password.value;
    user.fullName = e.target.fullName.value;
    console.log('user', user)
    this.accountService.createAccount(user).subscribe(response => console.log(response),
     (err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    })

    // this.fb.signup(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
    //   this.router.navigateByUrl('');
    // }, (err) => {
    //   this.errorMessage = err;
    //   setTimeout(() => this.errorMessage = '', 2000);
    // });
  }
  getCountry(event){
    this.selectedCountry = event;
  }
}
