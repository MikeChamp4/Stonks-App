import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { setLoggedIn } from './../../modules/store/actions.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<{ loggedIn: boolean }>) { }

  private API_URL = "http://localhost:3000"

  getLogin(email: string) {
    return this.http.post(this.API_URL + '/login', {email}, {withCredentials: true});
  }

  verifyToken(email: string, token: string) {
    return this.http.post(this.API_URL + '/login/verify', {email, token}, {withCredentials: true});
  }

  checkLoggedIn() {
    const URL_API = "http://localhost:3000/login/verifyJWT";
    axios.post(URL_API, {}, {withCredentials: true})
      .then(res => this.store.dispatch(setLoggedIn({ loggedIn: true })))
      .catch(err => this.store.dispatch(setLoggedIn({ loggedIn: false })));
  }
}
