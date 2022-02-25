import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { BillingService } from '../billing/billing.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  branch_id: string,
  patient_id: '',
  invoice_no: '',
  inv_sr_no: '',
  amt_payment: '',
  payment_mode: '',
  updated_by: ''
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  mobile_no: string = '';
  invoice: string = '';
  patientDetail = false;
  invoiceDetails: any;
  invoiceArray: any = [];
  billingArray: any = [];
  paymentItem = {
    branch_id: localStorage.getItem('branch_id'),
    patient_id: '',
    invoice_no: this.invoice,
    inv_sr_no: '',
    amt_payment: '',
    payment_mode: '',
    updated_by: localStorage.getItem('user_id')
  }
  constructor(private bs: BillingService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private ps: PaymentService) {

  }
  
  
  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.invoice = data.item;
      this.paymentItem.patient_id = data.patient_id;
      this.ps.fetchItemsUnderInvoice(this.invoice).subscribe(data => {
      if (data.length > 0) {
        data.forEach((element: any) => {
          this.setProductAlias(element)
        });
      }

      this.billingArray = data;
    });
    })      
  }

  setProductAlias(element: any) {
    if (element.bill_type_id === 'P') {
      element.billAlias = 'PHARMACY';
    } else if (element.bill_type_id === 'D') {
      element.billAlias = 'DIALYSIS';
    } else {
      element.billAlias = 'LAB';
    }

  }
  clearDialogFields(item: any) {
    item.amt_payment = ''
    item.payment_mode = '';
  }
  showPayment(item: any) {
    this.clearDialogFields(item);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentItem.amt_payment = result.amt_payment;
        this.paymentItem.payment_mode = result.payment_mode;
        this.paymentItem.inv_sr_no = result.inv_sr_no;
        this.paymentItem.invoice_no = result.invoice_no;
       // this.paymentItem.patient_id = this.bs.patient_id;
        this.makePayment();
      } else {
        this.paymentItem = {
          branch_id: localStorage.getItem('branch_id'),
          patient_id: '',
          invoice_no: this.invoice,
          inv_sr_no: '',
          amt_payment: '',
          payment_mode: '',
          updated_by: localStorage.getItem('user_id')
        }
      }

    });
  }
  makePayment() {

    console.log(this.paymentItem);
    
    this.ps.submitPayment(this.paymentItem).subscribe(data => {
      alert('payment done');
      this.paymentItem = {
        branch_id: localStorage.getItem('branch_id'),
        patient_id: '',
        invoice_no: this.invoice,
        inv_sr_no: '',
        amt_payment: '',
        payment_mode: '',
        updated_by: localStorage.getItem('user_id')
      }
      this.router.navigate(['landing']);
    })
  }
  navigateToInvoice(){
    this.router.navigate(['invoice']);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
