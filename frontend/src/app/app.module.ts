import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { loggedInReducer } from './modules/store/reducer.module';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';

import { MaterialModule } from './modules/material/material.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SigninComponent } from './pages/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    FooterComponent,
    ResetPasswordComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),

    StoreModule.forRoot({ loggedIn: loggedInReducer }),

    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
