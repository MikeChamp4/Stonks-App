import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store'; // Importamos Stor
import { setLoggedIn } from './../../modules/store/actions.module';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<{ loggedIn: boolean }>,
    private router: Router,
  ) { }

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
    this.http.post(this.API_URL + '/login/verifyJWT', {}, { withCredentials: true })
      .subscribe(
        () => this.store.dispatch(setLoggedIn({ loggedIn: true })),
        () => this.store.dispatch(setLoggedIn({ loggedIn: false }))
      );
  }

  getEmail() {
    return this.http.post(this.API_URL + '/login/verifyJWT', {}, { withCredentials: true });
  }

  logout() {
    this.http.post(this.API_URL + '/logout', {}, { withCredentials: true }).subscribe(() => {
      window.location.reload();
      this.router.navigate(['/home']);
    });
  }

  loginPassword(email: string, password: string) {
    return this.http.post(
      this.API_URL + '/login/password',
      { email, password },
      { withCredentials: true },
    );
  }

  resetPassword(email: string, password: string) {
    return this.http.post(
      this.API_URL + '/user/update-account',
      { email, password },
      { withCredentials: true },
    );
  }

  isEmailRegistred(email: string) {
    return this.http.get(this.API_URL + '/user/' + email, { withCredentials: true }).pipe(
      map((response: any) => {
        if (response.user) {
          if (response.user.email === undefined) {
            return true;
          }
          return false;
        } else {
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return of(false);
        }

        return throwError(error);
      })
    );
  }

  emailHasPassword(email: string) {
    return this.http.get(this.API_URL + '/user/' + email, { withCredentials: true }).pipe(
      map((response: any) => {
        if (response.user) {
          if (response.user.password !== undefined) {
            return true;
          }
          return false;
        } else {
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return of(false);
        }

        return throwError(error);
      })
    );
  }

}
