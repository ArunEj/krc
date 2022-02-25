import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AptBookingComponent } from './apt-booking/apt-booking.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AuthService } from './services/auth.service';
import { DocConsultationComponent } from './doc-consultation/doc-consultation.component';
import { BillingComponent } from './billing/billing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { PaymentComponent } from './payment/payment.component';
import {DialogOverviewExampleDialog} from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LandingComponent,
    AptBookingComponent,
    PatientRegistrationComponent,
    DocConsultationComponent,
    BillingComponent,
    PaymentComponent,
    DialogOverviewExampleDialog,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
