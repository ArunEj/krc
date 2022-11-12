import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { receiptPaymentReportsService } from './receipt-payment-report.service';

@Component({
  selector: 'app-receipt-payment-report',
  templateUrl: './receipt-payment-report.component.html',
  styleUrls: ['./receipt-payment-report.component.scss']
})
export class ReceiptPaymentReportComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;
  displayedColumns: string[] = ['transaction_date', 'acc_type', 'acc_desc', 'trans_id', 'amount', 'payment_mode', 'payment_reference', 'subledger_type', 'subledger_name', 'voucher_number', 'voucher_date', 'narration', 'remarks'];
  dataSource: any;
  resultsLength = 0;
  
  constructor(private rpService: receiptPaymentReportsService, private dp: DatePipe,
    private dateAdapter:DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }

  getReports() {
    const branchId = localStorage.getItem('branch_id');
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.rpService.retrieveData(branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
      this.dataSource = this.reportData;
    })
  }
}
