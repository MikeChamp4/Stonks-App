import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private http: HttpClient) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const  URL_API = "http://localhost:3000/login/verifyJWT";

      axios.post(URL_API, {}, {withCredentials: true})
      .then(res => {
        console.log(res.data)
        if (route.url.toString() === 'login') {
          this.router.navigate(['/home']);
        }
        return true
      })
      .catch(err => {
        console.log(err)
        this.router.navigate(['/login']);
        return false;
      })
      return true
    }

}


