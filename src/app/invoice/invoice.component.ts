import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  mobile_no: string = '';
  invoiceDetails: any;
  patientDetail = false;
  constructor(private is: InvoiceService, private router: Router) {

  }

  ngOnInit(): void {
  }
  fetchUserInvoices() {
    this.is.fetchInvoices(this.mobile_no).subscribe(data => {
      if (data) {
        this.invoiceDetails = data;
      }

      //this.invoiceArray = data.invoice_no;
    })
  }



}
