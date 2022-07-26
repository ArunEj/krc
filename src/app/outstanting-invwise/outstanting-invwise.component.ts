import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utilities/services/utility.service';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { OutstandingInvwiseService } from './outstanding-invwise.service';

@Component({
  selector: 'app-outstanting-invwise',
  templateUrl: './outstanting-invwise.component.html',
  styleUrls: ['./outstanting-invwise.component.scss'],
  providers: [DatePipe]
})
export class OutstantingInvwiseComponent implements OnInit {

  today = new Date();
  reportData: any = [];
  from_date: any;
  to_date: any;
  constructor(private dp: DatePipe, private us: UtilityService,
    private dateAdapter: DateAdapter<Date>, private outstandingInvwiseService: OutstandingInvwiseService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.reportData =
      [
        {
          "inv_date": "2022-07-05",
          "net_inv_amt": 17350,
          "net_inv_paid": 6201,
          "net_inv_bal": 11149,
          "details": [
            {
              "invoice_no": "INVKRC00010000000077",
              "patient_name": "Adithya",
              "inv_date": "2022-07-05T00:00:00.000Z",
              "ref_desc": "Normal",
              "net_inv_amount": 6400,
              "net_inv_paid": 0,
              "net_inv_balance": 6400
            },
            {
              "invoice_no": "INVKRC00010000000052",
              "patient_name": "DHANALAKSHMI",
              "inv_date": "2022-07-05T00:00:00.000Z",
              "ref_desc": "Corporate",
              "net_inv_amount": 2150,
              "net_inv_paid": 0,
              "net_inv_balance": 2150
            },
            {
              "invoice_no": "INVKRC00010000000066",
              "patient_name": "KRISHNAN",
              "inv_date": "2022-07-05T00:00:00.000Z",
              "ref_desc": "Normal",
              "net_inv_amount": 1500,
              "net_inv_paid": 0,
              "net_inv_balance": 1500
            },
            {
              "invoice_no": "INVKRC00010000000076",
              "patient_name": "Lakshminarasimhan",
              "inv_date": "2022-07-05T00:00:00.000Z",
              "ref_desc": "Govt. Working",
              "net_inv_amount": 5400,
              "net_inv_paid": 4400,
              "net_inv_balance": 1000
            },
            {
              "invoice_no": "INVKRC00010000000061",
              "patient_name": "Lakshminarasimhan",
              "inv_date": "2022-07-05T00:00:00.000Z",
              "ref_desc": "Govt. Working",
              "net_inv_amount": 1900,
              "net_inv_paid": 1801,
              "net_inv_balance": 99
            }
          ]
        },
        {
          "inv_date": "2022-07-06",
          "net_inv_amt": 14850,
          "net_inv_paid": 4900,
          "net_inv_bal": 9950,
          "details": [
            {
              "invoice_no": "INVKRC00010000000102",
              "patient_name": "Adithya",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "Normal",
              "net_inv_amount": 2900,
              "net_inv_paid": 0,
              "net_inv_balance": 2900
            },
            {
              "invoice_no": "INVKRC00010000000103",
              "patient_name": "Lakshminarasimhan",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "Govt. Working",
              "net_inv_amount": null,
              "net_inv_paid": 0,
              "net_inv_balance": 0
            },
            {
              "invoice_no": "INVKRC00010000000099",
              "patient_name": "Lakshminarasimhan",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "Govt. Working",
              "net_inv_amount": 5200,
              "net_inv_paid": 4900,
              "net_inv_balance": 300
            },
            {
              "invoice_no": "INVKRC00010000000101",
              "patient_name": "Rajaguru",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "CKH",
              "net_inv_amount": null,
              "net_inv_paid": 0,
              "net_inv_balance": 0
            },
            {
              "invoice_no": "INVKRC00010000000100",
              "patient_name": "Rajaguru",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "CKH",
              "net_inv_amount": null,
              "net_inv_paid": 0,
              "net_inv_balance": 0
            },
            {
              "invoice_no": "INVKRC00010000000098",
              "patient_name": "ramasubramanian",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "CM Care",
              "net_inv_amount": 2000,
              "net_inv_paid": 0,
              "net_inv_balance": 2000
            },
            {
              "invoice_no": "INVKRC00010000000095",
              "patient_name": "SHEELA ",
              "inv_date": "2022-07-06T00:00:00.000Z",
              "ref_desc": "CKH",
              "net_inv_amount": 4750,
              "net_inv_paid": 0,
              "net_inv_balance": 4750
            }
          ]
        }

      ];

  }

  getReports() {
    let from_date = this.dp.transform(this.from_date, 'yyyy-MM-dd');
    let to_date = this.dp.transform(this.to_date, 'yyyy-MM-dd');
    this.outstandingInvwiseService.retrieveData(from_date, to_date).subscribe(data => {
      this.reportData = data.results;
    })
  }


  export2Excel() {
    this.us.export2Excel('collectionwise-table', 'collectionwise.xlsx')
  }

}
