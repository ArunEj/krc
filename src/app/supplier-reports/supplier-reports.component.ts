import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { supplierReportsService } from './supplier-reports.service';

@Component({
  selector: 'app-supplier-reports',
  templateUrl: './supplier-reports.component.html',
  styleUrls: ['./supplier-reports.component.scss']
})
export class SupplierReportsComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;
  displayedColumns: string[] = ['Supplier Name', 'PO No', 'PO Date', 'Supplier Inv No', 'Supplier Inv Date', 'Supplier Inv Amt', 'Supplier Inv Paid', 'Supplier Inv Bal', 'Payment', 'Payment Dt', 'Payment Mode', 'Remarks'];
  dataSource: any;
  resultsLength = 0;
  
  constructor(private srService: supplierReportsService, private dp: DatePipe,
    private dateAdapter:DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }
  getReports() {
    const branchId = localStorage.getItem('branch_id');
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.srService.retrieveData(branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
      this.dataSource = this.reportData;
    })
  }

}
