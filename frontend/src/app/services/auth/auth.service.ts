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


// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import axios from 'axios'
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(false); // Define una propiedad loggedIn que es un BehaviorSubject que inicialmente emite el valor false.
//   loggedIn$: Observable<boolean> = this.loggedIn.asObservable(); // Define una propiedad loggedIn$ que es un Observable que muestra los valores que emite loggedIn.

//   constructor(private http: HttpClient) { }

//   private API_URL = "http://localhost:3000"

//   getLogin(email: string) { // Define un método getLogin que hace una petición POST a /login.
//     return this.http.post(this.API_URL + '/login', {email}, {withCredentials: true});
//   }

//   verifyToken(email: string, token: string) { // Define un método verifyToken que hace una petición POST a /login/verify.
//     return this.http.post(this.API_URL + '/login/verify', {email, token}, {withCredentials: true});
//   }

//   checkLoggedIn() { // Define un método checkLoggedIn que verifica si el usuario está conectado.
//     const URL_API = "http://localhost:3000/login/verifyJWT";
//     axios.post(URL_API, {}, {withCredentials: true})
//       .then(res => this.loggedIn.next(true)) // Si la petición es exitosa, emite true a través de loggedIn.
//       .catch(err => this.loggedIn.next(false)); // Si la petición falla, emite false a través de loggedIn.
//   }

//   setLoggedIn(value: boolean) { // Define un método setLoggedIn que emite el valor proporcionado a través de loggedIn.
//     this.loggedIn.next(value);
//   }
// }
