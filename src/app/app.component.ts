import { AuthService } from './services/auth.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { User } from './model/model.user';
import { ObserverService } from './services/observer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMenu = false;
  darkModeActive: boolean;

  username;
  
  message: any;
  subscription: Subscription;

   constructor(public router: Router, private authService:AuthService, private observerService:ObserverService) {
    this.subscription = this.observerService.getNotification().subscribe(value => { 
    console.log('a fost notificat')
    let user = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log(user)
    if (user != undefined){
      this.username = JSON.parse(window.localStorage.getItem('currentUser')).username;
    }
  });
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
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
}
