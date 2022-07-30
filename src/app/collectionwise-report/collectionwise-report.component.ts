import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CollectionwiseReportService } from './collectionwise-report.service';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-collectionwise-report',
  templateUrl: './collectionwise-report.component.html',
  styleUrls: ['./collectionwise-report.component.scss'],
  providers: [DatePipe]
})
export class CollectionwiseReportComponent implements OnInit {
  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  constructor(private dp: DatePipe, private us: UtilityService,
    private dateAdapter: DateAdapter<Date>, private patientwiseService: CollectionwiseReportService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {

  }

  getReports() {
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.patientwiseService.retrieveData(from_date, to_date).subscribe(data => {
      this.reportData = data.results;
    })
  }


  export2Excel() {
    this.us.export2Excel('collectionwise-table', 'collectionwise.xlsx')
  }

}
