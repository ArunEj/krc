import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { BillingService } from '../billing/billing.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  invoice: string = '';
  billingArray: any = [];
  paymentItem = {
    branch_id: localStorage.getItem('branch_id'),
    patient_id:'',
    invoice_no: this.invoice,
    inv_sr_no: '',    
    amt_payment: '',
    payment_mode:'',
    updated_by:localStorage.getItem('user_id')
  }
  constructor(private bs: BillingService, private router:Router,private ps: PaymentService) {
    
   }

  ngOnInit(): void {
   // this.bs.invoice_no = 'BR1010000000001';
   // this.bs.patient_id = 'PATMA13';
    this.invoice = this.bs.invoice_no;    
    this.ps.fetchItemsUnderInvoice(this.invoice).subscribe(data => {
      if(data.length>0){
        data.forEach((element: any) => {
          this.setProductAlias(element)
       });
      }
      
      this.billingArray = data;
    });
  }

  setProductAlias(element: any) {
    if (element.bill_type_id === 'P'){
      element.billAlias = 'PHARMACY';
    } else if(element.bill_type_id === 'D'){
      element.billAlias = 'DIALYSIS';
    } else {
      element.billAlias = 'LAB';
    }
      
  } 
makePayment(item: any) {
  this.paymentItem.inv_sr_no = item.inv_sr_no; 
  this.paymentItem.invoice_no = item.invoice_no; 
  this.paymentItem.patient_id = this.bs.patient_id;
  console.log(this.paymentItem);
  this.ps.submitPayment(this.paymentItem).subscribe(data=>{
    alert('payment done');
    this.router.navigate(['landing']);
  })
}
}
