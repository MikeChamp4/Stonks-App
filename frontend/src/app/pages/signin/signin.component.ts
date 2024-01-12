import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core';

import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { setLoggedIn } from 'src/app/modules/store/actions.module';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<{ loggedIn: boolean }>,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private toastr: ToastrService,
  ){
    this.loggedIn$ = this.store.select(state => state.loggedIn);
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  onEmailChange(event: any) {
    this.email = event.target.value;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if(this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      this.authService.loginPassword(email, password).subscribe(
        (res: any) =>  {

          localStorage.setItem('token', res.token);

          if(res.message === 'Login successful'){
            this.store.dispatch(setLoggedIn({ loggedIn: true }));
            this.ngZone.run(() => this.router.navigateByUrl('/home'));
            this.showToast('s', 'Successful login');
            this.router.navigate(['/home']);
            console.log('Login successful');
          }
        },
        (err) => {
          console.log(err);
          this.showToast('e', 'Login failed');
        }
      );
    } else {
      console.log('Email or password is undifined');
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
