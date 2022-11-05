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
  
  constructor(private srService: supplierReportsService, private dp: DatePipe,
    private dateAdapter:DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }
  getReports() {
    const poNumber = 'PRD000004';
    this.srService.getTableData(poNumber).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
    })
  }

}
