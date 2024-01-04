import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  loggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<{ loggedIn: boolean }>) {
    this.loggedIn$ = this.store.select('loggedIn');
  }

  ngOnInit() {
    this.authService.checkLoggedIn();
  }
}

// // navbar.component.ts
// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth/auth.service';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {
//   loggedIn$: Observable<boolean>; // Define una propiedad loggedIn$ que es un Observable que emite booleanos.

//   constructor(private authService: AuthService, private store: Store<{ loggedIn: boolean }>) { // Define el constructor de la clase, que inyecta AuthService y Store.
//     this.loggedIn$ = this.authService.loggedIn$; // Asigna el Observable loggedIn$ de authService a la propiedad loggedIn$ del componente.
//   }

//   ngOnInit() { // Define el método ngOnInit, que se ejecuta después de que Angular ha inicializado los datos enlazados del componente.
//     this.authService.checkLoggedIn(); // Llama al método checkLoggedIn de authService para verificar si el usuario está conectado.
//   }
// }
