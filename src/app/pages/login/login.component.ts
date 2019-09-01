import { User } from './../../model/model.user';
import { AuthService } from './../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {first, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser;
  errorMessage = '';
  constructor(public router: Router, private authService:AuthService) {
  }

  ngOnInit() {
  }

  login(e) {
    let user = new User();
    user.username = e.target.username.value;
    user.password = e.target.password.value;
    this.authService.logIn(user).subscribe((response: any) => {
      this.currentUser = response.body.principal;
      if (this.currentUser) {
        localStorage.setItem("auth", btoa( user.username+ ':' + user.password));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate(['/home'])
      }
    },(err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    });
  }

}
