import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src\\app\\services\\auth\\auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

  constructor(private router: Router,
    private ngZone: NgZone,
    private loginService: LoginService,
    private authService: AuthService,
  ) { }

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
      this.loginService.getLogin(email).subscribe(
        (res: any) => {
          this.ngZone.run(() => {
            this.isEmailSent = true;
            this.sentEmail = email;
          });
        },
        (err) => {
          console.log(err);
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
      this.loginService.verifyToken(email, token).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);

          if (res.message === 'Successful login' && localStorage.getItem('token')) {
            this.authService.setLoggedIn(true);
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('Token or email is undefined or null');
    }
  }

}
