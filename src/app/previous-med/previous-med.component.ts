import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MedPreparationService } from './previous-med.service';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

export interface LabItem {
  visit_no: any;
  id?: any;
  bu_id?: string;
  product_id?: string;
  medicine_id: string;
  morning_bf?: number;
  morning_af?: number;
  noon_bf?: number;
  noon_af?: number;
  evening_bf?: number;
  evening_af?: number;
  night_bf?: number;
  night_af?: number;
  other_time_desc?: string;
  other_time_bf?: number;
  other_time_af?: number;
  no_of_days: number;
  remarks?: string;
}

@Component({
  selector: 'app-previous-med',
  templateUrl: './previous-med.component.html',
  styleUrls: ['./previous-med.component.scss']
})
export class PreviousMedComponent implements OnInit {
  @Input()
  headerData: any;

  pharmaList: any = [];
  tableData: LabItem[] = [];

  previousData: LabItem[] = [];
  labPayload = {};
  prevCounter: number | undefined;
  recordIndex: number | undefined;
  disableNext = false;
  currentPharmaDetail: any = [];
  constructor(private mpService: MedPreparationService,
    private utility: UtilityService, private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.mpService.fetchProducts('PHARM').subscribe((data) => {
      this.pharmaList = data.results;
    });


    this.mpService.fetchLastPharmaDetails(this.headerData.patient_id).subscribe(data => {
      this.previousData = data.results;
      this.tableData = this.previousData
      //this.tableData = this.getData();
      this.prevCounter = this.tableData[0].visit_no;
      this.setCurrentPatientData();

    }, error => {
      // this.dialog.open(InfoDialogComponent, {
      //   width: '500px',
      //   data: 'No data found'
      // })
    })
  }

  addRecord() {
    this.tableData.push({
      id: this.tableData.length,
      medicine_id: '',
      morning_bf: 0,
      morning_af: 0,
      noon_bf: 0,
      noon_af: 0,
      evening_bf: 0,
      evening_af: 0,
      night_bf: 0,
      night_af: 0,
      other_time_desc: '',
      other_time_bf: 0,
      other_time_af: 0,
      no_of_days: 0,
      remarks: '',
      visit_no: ''
    })
  }

  setCurrentPatientData() {
    this.currentPharmaDetail = this.getFilteredData();
    if (this.prevCounter! >= this.tableData[0].visit_no) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }

  }


  getFilteredData() {
    return this.tableData.filter((data => data.visit_no === this.prevCounter));
  }

  getLastRecordIndex() {
    return this.prevCounter;
  }
  prevItem() {
    this.prevCounter!--;
    this.setCurrentPatientData();
  }

  nextItem() {
    this.prevCounter!++;
    this.setCurrentPatientData();
  }


  getData() {
    let x = {
      "summary": {
        "filteredsize": 6,
        "resultsize": 25,
        "totalsize": 6
      },
      "results": [
        {
          "org_id": "KRC",
          "branch_id": "KRC0001",
          "business_id": "",
          "doctor_id": "KRC0010002",
          "patient_id": "PATKRC000100002",
          "visit_no": 6,
          "prescription_date": "2022-06-07T18:30:00.000Z",
          "medicine_id": "PRD000010",
          "morning_bf": 0,
          "morning_af": 1,
          "noon_bf": 0,
          "noon_af": 0,
          "evening_bf": 0,
          "evening_af": 1,
          "night_bf": 0,
          "night_af": 0,
          "other_time_desc": "Mid Night",
          "other_time_bf": 0,
          "other_time_af": 1,
          "no_of_days": 3,
          "invoiced": null,
          "remarks": "Only on SOS",
          "delivery_mode": null,
          "invoice_num": null,
          "updated_by": "KRC0010002",
          "updated_date": "2022-06-07T18:30:00.000Z",
          "created_by": "KRC0010002",
          "created_date": "2022-06-07T18:30:00.000Z"
        },
        {
          "org_id": "KRC",
          "branch_id": "KRC0001",
          "business_id": "",
          "doctor_id": "KRC0010002",
          "patient_id": "PATKRC000100002",
          "visit_no": 6,
          "prescription_date": "2022-06-07T18:30:00.000Z",
          "medicine_id": "PRD000011",
          "morning_bf": 1,
          "morning_af": 1,
          "noon_bf": 1,
          "noon_af": 1,
          "evening_bf": 1,
          "evening_af": 1,
          "night_bf": 1,
          "night_af": 1,
          "other_time_desc": "Early Morning",
          "other_time_bf": 1,
          "other_time_af": 1,
          "no_of_days": 3,
          "invoiced": null,
          "remarks": "Every 4 hours ",
          "delivery_mode": null,
          "invoice_num": null,
          "updated_by": "KRC0010002",
          "updated_date": "2022-06-07T18:30:00.000Z",
          "created_by": "KRC0010002",
          "created_date": "2022-06-07T18:30:00.000Z"
        },
        {
          "org_id": "KRC",
          "branch_id": "KRC0001",
          "business_id": "",
          "doctor_id": "KRC0010002",
          "patient_id": "PATKRC000100002",
          "visit_no": 5,
          "prescription_date": "2022-06-07T18:30:00.000Z",
          "medicine_id": "PRD000010",
          "morning_bf": 0,
          "morning_af": 1,
          "noon_bf": 0,
          "noon_af": 0,
          "evening_bf": 0,
          "evening_af": 0,
          "night_bf": 0,
          "night_af": 1,
          "other_time_desc": "",
          "other_time_bf": 0,
          "other_time_af": 0,
          "no_of_days": 3,
          "invoiced": null,
          "remarks": "Only on SOS",
          "delivery_mode": null,
          "invoice_num": null,
          "updated_by": "KRC0010002",
          "updated_date": "2022-06-07T18:30:00.000Z",
          "created_by": "KRC0010002",
          "created_date": "2022-06-07T18:30:00.000Z"
        },
        {
          "org_id": "KRC",
          "branch_id": "KRC0001",
          "business_id": "",
          "doctor_id": "KRC0010002",
          "patient_id": "PATKRC000100002",
          "visit_no": 4,
          "prescription_date": "2022-06-07T18:30:00.000Z",
          "medicine_id": "PRD000010",
          "morning_bf": 1,
          "morning_af": 0,
          "noon_bf": 1,
          "noon_af": 0,
          "evening_bf": 1,
          "evening_af": 0,
          "night_bf": 1,
          "night_af": 0,
          "other_time_desc": "",
          "other_time_bf": 0,
          "other_time_af": 0,
          "no_of_days": 4,
          "invoiced": null,
          "remarks": "rem",
          "delivery_mode": null,
          "invoice_num": null,
          "updated_by": "KRC0010002",
          "updated_date": "2022-06-07T18:30:00.000Z",
          "created_by": "KRC0010002",
          "created_date": "2022-06-07T18:30:00.000Z"
        },
        {
          "org_id": "KRC",
          "branch_id": "KRC0001",
          "business_id": "PHARM",
          "doctor_id": "KRC0001DOC002",
          "patient_id": "PATKRC000100002",
          "visit_no": 2,
          "prescription_date": "2022-06-06T18:30:00.000Z",
          "medicine_id": "PRD000001",
          "morning_bf": 2,
          "morning_af": 2,
          "noon_bf": 2,
          "noon_af": 2,
          "evening_bf": 2,
          "evening_af": 2,
          "night_bf": 2,
          "night_af": 2,
          "other_time_desc": "check regularly",
          "other_time_bf": 3,
          "other_time_af": 3,
          "no_of_days": 5,
          "invoiced": "Y",
          "remarks": "check regularly",
          "delivery_mode": "P",
          "invoice_num": "2",
          "updated_by": "KRC0010002",
          "updated_date": "2022-06-06T18:30:00.000Z",
          "created_by": "KRC0010002",
          "created_date": "2022-06-06T18:30:00.000Z"
        },
        {
          "org_id": "KRC",
          "branch_id": "KRC0001",
          "business_id": "PHARM",
          "doctor_id": "KRC0001DOC002",
          "patient_id": "PATKRC000100002",
          "visit_no": 1,
          "prescription_date": "2022-06-06T18:30:00.000Z",
          "medicine_id": "PRD000001",
          "morning_bf": 2,
          "morning_af": 2,
          "noon_bf": 2,
          "noon_af": 2,
          "evening_bf": 2,
          "evening_af": 2,
          "night_bf": 2,
          "night_af": 2,
          "other_time_desc": "check regularly",
          "other_time_bf": 3,
          "other_time_af": 3,
          "no_of_days": 5,
          "invoiced": "Y",
          "remarks": "check regularly",
          "delivery_mode": "P",
          "invoice_num": "2",
          "updated_by": "KRC0010002",
          "updated_date": "2022-06-06T18:30:00.000Z",
          "created_by": "KRC0010002",
          "created_date": "2022-06-06T18:30:00.000Z"
        }
      ]
    };
    return x.results;
  }


}





