import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceService } from '../utilities/services/reference.service';
import { AdvancePaymentService } from './advance-payment.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface Payment_mode {
  ref_type: string;
  ref_code: string;
  ref_desc: string;
}
@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.css']
})
export class AdvancePaymentComponent implements OnInit {

  paymentform!: FormGroup;
  submitted = false;
  headerDetail: any;
  paymentModes: Payment_mode[] = [];

  payment_mode = { ref_type: '', ref_code: '', ref_desc: '' }
  constructor(private formBuilder: FormBuilder,
    private advancePay: AdvancePaymentService,
    private router:Router, private dialog: MatDialog, private ref: ReferenceService) { }

  ngOnInit(): void {

    this.ref.getPaymentModes('PAYMOD').subscribe(data => {
      this.paymentModes = data.results;
    })
    this.paymentform = this.formBuilder.group(
      {
        paymentMode: ['', Validators.required],
        paymentAmount: ['', [Validators.required, Validators.min(1)]],
        paymentRemarks: ['', [Validators.required]]
      }
    );
    this.paymentform.controls['paymentAmount'].setValue('1');
  }

  get check() {
    return this.paymentform.controls;
  }

  onSubmit(): void {
    if (this.paymentform.invalid) {
      return;
    }
    this.submitted = true;
    let payload =
    {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "user_id": localStorage.getItem('user_id'),
      "payment_amount": this.paymentform.controls['paymentAmount'].value,
      "payment_remark": this.paymentform.controls['paymentRemarks'].value,
      "payment_mode": this.paymentform.controls['paymentMode'].value

    }
    this.advancePay.submitAdvPayment(payload).subscribe(data => {
     const dialog = this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Advance Payment Success!'
      });

      this.router.navigate(['/landing'])
    }, error=>{
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Error Occured!'
      });
    })

  }

  onReset(): void {
    this.submitted = false;
    this.paymentform.reset();
  }

  patientHeader(data: any) {
    this.headerDetail = data;
  }
}
