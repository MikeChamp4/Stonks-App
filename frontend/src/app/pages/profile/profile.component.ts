import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void { }

  countrylist = ['India', 'USA', 'Singapore', 'UK']
  termlist = ['15days', '30days', '45days', '60days']
  message: string = "";
  customerform = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control({ value: this.message, disabled: true }, Validators.required),
    phone: this.builder.control('', Validators.required),
    country: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    term: this.builder.control('', Validators.required),
    dob: this.builder.control(new Date(2000, 3, 25)),
    gender: this.builder.control('Male'),
  });

  initializeForm() {
    this.authService.getEmail().subscribe(email => {
      this.message = Object.values(email)[1];
      console.log(this.message);
      this.customerform = this.builder.group({
        name: this.builder.control('', Validators.required),
        email: this.builder.control({ value: this.message, disabled: true }, Validators.required),
        phone: this.builder.control('', Validators.required),
        country: this.builder.control('', Validators.required),
        address: this.builder.control('', Validators.required),
        term: this.builder.control('', Validators.required),
        dob: this.builder.control(new Date(2000, 3, 25)),
        gender: this.builder.control('Male'),
      });
    });
  }

  SaveCustomer() {
    console.log(this.customerform.value);
  }

  clearform() {
    this.customerform.reset();
  }

  resetPassword() {
    this.router.navigate(['/reset-password']);
    console.log("reset password");
  }



  logout() {
    this.authService.logout();
    console.log("logout");
  }


}
