import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    countrylist = ['India', 'USA', 'Singapore', 'UK']
    termlist = ['15days', '30days', '45days', '60days']

    constructor(private builder: FormBuilder, private authService: AuthService) {

    }
    ngOnInit(): void { }


    customerform = this.builder.group({
        name: this.builder.control('', Validators.required),
        email: this.builder.control('', Validators.required),
        phone: this.builder.control('', Validators.required),
        country: this.builder.control('', Validators.required),
        address: this.builder.control('', Validators.required),
        term: this.builder.control('', Validators.required),
        dob: this.builder.control(new Date(2000, 3, 25)),
        gender: this.builder.control('Male'),
    });

    SaveCustomer() {
        console.log(this.customerform.value);
    }

    clearform() {
        this.customerform.reset();
    }

    resetPassword() {
      //this.router.navigate(['/reset-password']);
      console.log("reset password");
    }

    logout() {
      this.authService.logout();
      console.log("logout");
    }
}
