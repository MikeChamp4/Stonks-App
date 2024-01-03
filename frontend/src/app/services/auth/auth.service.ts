import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  private API_URL = "http://localhost:3000"

  getLogin(email: string) {
    return this.http.post(this.API_URL + '/login', {email}, {withCredentials: true});
  }

  verifyToken(email: string, token: string) {
    return this.http.post(this.API_URL + '/login/verify', {email, token}, {withCredentials: true});
  }


  get isLoggedIn() {
    const URL_API = "http://localhost:3000/login/verifyJWT";
    const resPost = axios.post(URL_API, {}, {withCredentials: true})
                .then(res => {return true})
                .catch(err=>{return false})
    //return this.loggedIn.asObservable();
    return resPost;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }
}
