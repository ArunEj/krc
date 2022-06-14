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
import { DialogPatientList } from './apt-booking/apt-booking.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { InfoDialogComponent } from './utilities/info-dialog/info-dialog.component';
import { PatientListDialogComponent } from './utilities/patient-list-dialog/patient-list-dialog.component';
import { BillingEditComponent } from './billing-edit/billing-edit.component';
import { PromptDialogComponent } from './utilities/prompt-dialog/prompt-dialog.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { LabPrescriptionComponent } from './lab-prescription/lab-prescription.component';
import { MedPrescriptionComponent } from './med-prescription/med-prescription.component';
import { ManageAppointmentComponent } from './manage-appointment/manage-appointment.component';
import {AdvancePaymentComponent} from './advance-payment/advance-payment.component';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';

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
    InvoiceComponent,
    DialogPatientList,
    ManageDialogComponent,
    InfoDialogComponent,
    PatientListDialogComponent,
    BillingEditComponent,
    PromptDialogComponent,
    PatientHeaderComponent,
    LabPrescriptionComponent,
    MedPrescriptionComponent,
    ManageAppointmentComponent,
    AdvancePaymentComponent,
    InvoicePrintComponent
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
