// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor ( private http: HttpClient, private router: Router){}

  URL_API = "http://localhost:3000/login"

  getLogin(email: string) {
    return this.http.post(this.URL_API, {email});
  }

  verifyToken(email: string, token: string) {
    return this.http.post(this.URL_API + '/verify', {email, token});
  }
}
