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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  tokenForm = new FormGroup({
    token: new FormControl('', Validators.required),
  });

  passwordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  hide = true;

  isEmailSent = false;
  isTokenConfirmed = false;
  correctToken = false;
  sentEmail: string | null = null;

  loggedIn$: Observable<boolean>;

  constructor(private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private toastr: ToastrService,
    private store: Store<{ loggedIn: boolean }>
  ) {
    this.loggedIn$ = this.store.select(state => state.loggedIn);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


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
          if (res.message === 'Successful login') {
            this.ngZone.run(() => {
              this.correctToken = true;
              this.isTokenConfirmed = true;
            });
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

  onVerifyPassword(): void {
    const email = this.loginForm.value.email;
    const password = this.passwordForm.value.password;
    const confirmPassword = this.passwordForm.value.confirmPassword;

    if (password && confirmPassword && email) {
      if (password === confirmPassword) {

        this.authService.resetPassword(email, password).subscribe(
          (res: any) => {
            this.ngZone.run(() => {
              this.router.navigate(['/home']);
            });
            this.showToast('s', 'Password reset');
          },
          (err) => {
            console.log(err);
            this.showToast('e', err.error.message);
          }
        );
      } else {
        this.showToast('e', 'Passwords do not match');
      }
    } else {
      console.log('Password is undefined or null');
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
