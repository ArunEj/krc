import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AptBookingComponent } from './apt-booking/apt-booking.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LandingComponent,
    AptBookingComponent,
    PatientRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
