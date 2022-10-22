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
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientwiseReportComponent } from './patientwise-report/patientwise-report.component';
import { CollectionwiseReportComponent } from './collectionwise-report/collectionwise-report.component';
import { OutstantingInvwiseComponent } from './outstanting-invwise/outstanting-invwise.component';
import { OutstantingPtwiseComponent } from './outstanting-ptwise/outstanting-ptwise.component';
import { SupplierMasterComponent } from './supplier/supplier-master/supplier-master.component';
import { SupplierProductComponent } from './supplier-product/supplier-product.component';
import { EodComponent } from './eod/eod.component';
import { PoComponent } from './po/po.component';
import { CollectionPaymentwiseReportComponent } from './collection-payment-report/collection-payment-report.component';
import { InsuranceSummaryComponent } from './insurance-summary/insurance-summary.component';
import { PatientScheduleComponent } from './patient-schedule/patient-schedule.component';
import { PatientListingReportComponent } from './patient-listing-report/patient-listing-report.component';
import { PaymentReceiptsComponent } from './payment-receipts/payment-receipts.component';
import { UpdatePayreceiptsComponent } from './update-payreceipts/update-payreceipts.component';
import { ProductMasterComponent } from './product-master/product-master.component';

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
    path: 'insurance',
    component: InsuranceComponent
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
  },
  {
    path: 'outstanding-ptwise-report',
    component: OutstantingPtwiseComponent
  },
  {
    path: 'supplier-master',
    component: SupplierMasterComponent
  },
  {
    path: 'supplier-product',
    component: SupplierProductComponent
  },
  {
    path: 'eod',
    component: EodComponent
  },
  {
    path: 'po',
    component: PoComponent
  },
  {
    path: 'collection-paymentwise-report',
    component: CollectionPaymentwiseReportComponent
  },
  {
    path: 'insurance-summary',
    component: InsuranceSummaryComponent
  },
  {
    path: 'patient-schedule',
    component: PatientScheduleComponent
  },
  {
    path: 'patient-listing',
    component: PatientListingReportComponent
  },
  {
    path: 'payment-receipts',
    component: PaymentReceiptsComponent
  },
  {
    path: 'update-payreceipts',
    component: UpdatePayreceiptsComponent
  },
  {
    path: 'product-master',
    component: ProductMasterComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
