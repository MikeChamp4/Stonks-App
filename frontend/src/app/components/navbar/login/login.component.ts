import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { NgZone } from '@angular/core';


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

  constructor(private loginService: LoginService, private router: Router, private cd: ChangeDetectorRef, private ngZone: NgZone) { }

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
        (res) => {
          console.log(res);
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
