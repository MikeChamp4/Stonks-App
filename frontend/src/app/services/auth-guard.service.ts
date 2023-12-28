import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwtService/jwt-service.service';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router, private http: HttpClient) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const  URL_API = "http://localhost:3000/login/verifyJWT";

    if (route.url.toString() === 'login') {
      return true;
    } else if (this.http.post(URL_API, { withCredentials: true })) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
