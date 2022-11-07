import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { goodsReportsService } from './goods-reports.service';

@Component({
  selector: 'app-goods-reports',
  templateUrl: './goods-reports.component.html',
  styleUrls: ['./goods-reports.component.scss']
})
export class GoodsReportsComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  suppDetails: any;
  suppInvTotal: number = 0;
  
  constructor(private grService: goodsReportsService, private dp: DatePipe,
    private dateAdapter:DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
  }
  getReports() {
    const branchId = localStorage.getItem('branch_id');
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.grService.retrieveData(branchId, from_date, to_date).subscribe(data => {
      console.log(data);
      this.reportData = data.results;
    })
  }
}
