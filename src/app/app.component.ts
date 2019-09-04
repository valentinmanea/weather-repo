import { AuthService } from './services/auth.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { User } from './model/model.user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMenu = false;
  darkModeActive: boolean;

  username;
  
  constructor(public router: Router, private authService:AuthService) {
    let user = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log(user)
    if (user != undefined){
      this.username = JSON.parse(window.localStorage.getItem('currentUser')).username;
    }
  }

  sub1;

  ngOnInit() {
    this.darkModeActive = true;
  }

  isUserLoggedIn(){
    return this.authService.isUserLoggedIn();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
 
  logout() {
    this.toggleMenu();
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
