import { FunctionCall } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AptBookingComponent } from './apt-booking/apt-booking.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DocConsultationComponent } from './doc-consultation/doc-consultation.component';
import { BillingComponent } from './billing/billing.component';
import { PaymentComponent } from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { PatientwiseReportComponent } from './patientwise-report/patientwise-report.component';
import { CollectionwiseReportComponent } from './collectionwise-report/collectionwise-report.component';
import { OutstantingInvwiseComponent } from './outstanting-invwise/outstanting-invwise.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'patient-reg',
    component: PatientRegistrationComponent
  },
  {
    path: 'apt-booking',
    component: AptBookingComponent
  },
  {
    path: 'doc-consult',
    component: DocConsultationComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'invoice/:item',
    component: PaymentComponent
  },
  {
    path: 'adv-payment',
    component: AdvancePaymentComponent
  },
  {
    path: 'print',
    component: InvoicePrintComponent
  },
  {
    path: 'manage-patient',
    component: ManagePatientComponent
  },
  {
    path: 'patientwise-report',
    component: PatientwiseReportComponent
  },
  {
    path: 'collectionwise-report',
    component: CollectionwiseReportComponent
  },
  {
    path: 'outstanding-invwise-report',
    component: OutstantingInvwiseComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
