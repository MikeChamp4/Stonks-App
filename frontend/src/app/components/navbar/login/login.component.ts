import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src\\app\\services\\auth\\auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
  });

  tokenForm = new FormGroup({
    token: new FormControl(''),
  });

  isEmailSent = false;

  constructor(private router: Router,
              private ngZone: NgZone,
              private loginService: LoginService,
              private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const email = this.loginForm.value.email;

    if (email) {
      this.loginService.getLogin(email).subscribe(
        (res: any) => {
          this.ngZone.run(() => {
            this.isEmailSent = true;
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
          if (res.message === 'Inicio de sesión exitoso') {
            this.authService.setLoggedIn(true);
            this.router.navigate(['/home-page']);
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
