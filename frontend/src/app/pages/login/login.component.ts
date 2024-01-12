import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { AuthService } from 'src\\app\\services\\auth\\auth.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLoggedIn } from 'src/app/modules/store/actions.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
  });

  ngOnInit() { }

  tokenForm = new FormGroup({
    token: new FormControl(''),
  });

  isEmailSent = false;

  loggedIn$: Observable<boolean>;

  constructor(private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private toastr: ToastrService,
    private store: Store<{ loggedIn: boolean }>
  ) {
    this.loggedIn$ = this.store.select(state => state.loggedIn);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  sentEmail: string | null = null;

  onSubmit(): void {
    const email = this.loginForm.value.email;

    if (email) {
      this.authService.getLogin(email).subscribe(
        (res: any) => {
          this.ngZone.run(() => {
            this.isEmailSent = true;
            this.sentEmail = email;
          });
          this.showToast('s', 'Email sent');
        },
        (err) => {
          console.log(err);
          this.showToast('e', 'Email not sent');
        }
      );
    } else {
      console.log('Email is undefined or null');
    }
  }


  onVerify(): void {
    const token = this.tokenForm.value.token;
    const email = this.loginForm.value.email;

    if (token && email) {
      this.authService.verifyToken(email, token).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);

          if (res.message === 'Successful login' && localStorage.getItem('token')) {
            this.store.dispatch(setLoggedIn({ loggedIn: true }));
            this.ngZone.run(() => this.router.navigateByUrl('/home'));
            this.showToast('s', 'Successful login');
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          console.log(err);
          this.showToast('e', 'Invalid token');
        }
      );
    } else {
      console.log('Token is undefined or null');
    }
  }

  showToast(type: string, message: string) {
    const config: Partial<IndividualConfig> = {
      positionClass: 'toast-bottom-right',
    };

    switch (type) {
      case 'w':
        this.toastr.warning(message, '', config);
        break;
      case 's':
        this.toastr.success(message, '', config);
        break;
      case 'e':
        this.toastr.error(message, '', config);
        break;
      default:
        this.toastr.info(message, '', config);
        break;
    }
  }

}
