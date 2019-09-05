import { User } from './../../model/model.user';
import { AuthService } from './../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';
import { ObserverService } from 'src/app/services/observer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser;
  errorMessage = '';
  constructor(public router: Router, private authService:AuthService, private observerService:ObserverService) {
  }

  ngOnInit() {
  }

  private subject = new Subject<any>();

  login(e) {
    let user = new User();
    user.username = e.target.username.value;
    user.password = e.target.password.value;
    this.authService.logIn(user).subscribe((response: any) => {
      this.currentUser = response.body.principal;
      if (this.currentUser) {
        localStorage.setItem("auth", btoa( user.username+ ':' + user.password));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.observerService.notify(true);
        this.router.navigate(['/home'])
      }
    },(err) => {
      console.log(err)
      if(err.error == null){
        if(err.message != null){
          if(err.message.indexOf('401') != -1){
            this.errorMessage = 'Incorrect credentials';
          }else{
            this.errorMessage = err.message;
          }
        }
      }else if(err.error.errorMessage){
        this.errorMessage = err.error.errorMessage;
      }else if(err.error.message){
       this.errorMessage = err.error.message;
      }      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    });
  }

}
