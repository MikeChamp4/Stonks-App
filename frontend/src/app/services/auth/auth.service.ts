import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'; // Importamos Store
import axios from 'axios';
import { setLoggedIn } from './../../modules/store/actions.module';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<{ loggedIn: boolean }>,
    private router: Router,
  ) {}

  private API_URL = 'http://localhost:3000';

  getLogin(email: string) {
    return this.http.post(
      this.API_URL + '/login',
      { email },
      { withCredentials: true }
    );
  }

  verifyToken(email: string, token: string) {
    return this.http.post(
      this.API_URL + '/login/verify',
      { email, token },
      { withCredentials: true }
    );
  }

  checkLoggedIn() {
    axios
      .post(this.API_URL + '/login/verifyJWT', {}, { withCredentials: true })
      .then((res) => this.store.dispatch(setLoggedIn({ loggedIn: true })))
      .catch((err) => this.store.dispatch(setLoggedIn({ loggedIn: false })));
  }

  logout() {
      this.http.post(this.API_URL + '/logout', {}, {withCredentials: true}).subscribe(() => {
      window.location.reload();
      this.router.navigate(['/home']);
    });
  }

  loginPassword(email: string, password: string){
    return this.http.post(
      this.API_URL + '/login/password',
      { email, password },
      { withCredentials: true },
    );
  }

  resetPassword(email: string, password: string){
    return this.http.post(
      this.API_URL + '/user/update-account',
      { email, password},
      { withCredentials: true },
    );
  }


}
