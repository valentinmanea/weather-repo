import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import {FbService} from '../services/fb/fb.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
      console.log(window.localStorage.getItem('currentUser'))
      if (window.localStorage.getItem('currentUser') == null){
        console.log('navighez')
        this.router.navigate(['login']);
        return false;
      }else{
        return true;
      }
  }
}
