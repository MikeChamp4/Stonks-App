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
