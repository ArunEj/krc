import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { OutstandingPtwiseService } from './outstanding-ptwise.service';

@Component({
  selector: 'app-outstanting-ptwise',
  templateUrl: './outstanting-ptwise.component.html',
  styleUrls: ['./outstanting-ptwise.component.scss'],
  providers: [DatePipe]
})
export class OutstantingPtwiseComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  constructor(private dp: DatePipe, private us: UtilityService,
    private dateAdapter: DateAdapter<Date>, private outstandingPtwiseService: OutstandingPtwiseService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.reportData = [];

  }

  getReports() {
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.outstandingPtwiseService.retrieveData(from_date, to_date).subscribe(data => {
      this.reportData = data.results;
    })
  }


  export2Excel() {
    this.us.export2Excel('collectionwise-table', 'outstanding-ptwise.xlsx')
  }

}
