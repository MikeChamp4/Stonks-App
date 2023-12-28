import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src\\app\\services\\auth\\auth.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router,
    private ngZone: NgZone,
    private loginService: LoginService,
    private authService: AuthService,
    private toastr: ToastrService
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
          //this.toastr.success('Email sent', 'Success');
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
      this.loginService.verifyToken(email, token).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);

          if (res.message === 'Successful login' && localStorage.getItem('token')) {
            this.authService.setLoggedIn(true);
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
