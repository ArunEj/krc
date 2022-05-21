import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MedPreparationService } from './med-prescription.service';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

export interface LabItem {
  id?: any;
  bu_id?: string;
  product_id?: string;
  product_name: string;
  morning_bf?: number;
  morning_af?: number;
  noon_bf?: number;
  noon_af?: number;
  evening_bf?: number;
  evening_af?: number;
  night_bf?: number;
  night_af?: number;
  adhoc_notes?: string;
  adhoc_bf?: number;
  adhoc_af?: number;
  days:number;
  remarks?: string;
}

@Component({
  selector: 'app-med-prescription',
  templateUrl: './med-prescription.component.html',
  styleUrls: ['./med-prescription.component.scss']
})
export class MedPrescriptionComponent implements OnInit {
  @Input()
  headerDetail: any;
  pharmaList: any = [];
  tableData: LabItem[] = [];
  labPayload = {};

  constructor(private mpService: MedPreparationService,
    private utility: UtilityService, private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.mpService.fetchProducts('PHARM').subscribe(data => {
      this.pharmaList = data.results;
    });
  }

  addRecord() {
    this.tableData.push({
      id: this.tableData.length,
      product_name: '',
      morning_bf: 0,
      morning_af: 0,
      noon_bf: 0,
      noon_af: 0,
      evening_bf: 0,
      evening_af: 0,
      night_bf: 0,
      night_af: 0,
      adhoc_notes:'',
      adhoc_bf: 0,
      adhoc_af: 0,
      days:0,
      remarks:''
    })
  }

  delete_item(item: any) {
this.tableData.splice(item.id,1);

  }

  updateLabDetails() {
    this.labPayload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "doctor_id": localStorage.getItem('user_id'),
      "user_id": localStorage.getItem('user_id'),
      "business_id": "",
      "visit_date": this.utility.convertTodayTostr(),
      "lab_details": []
    }

    // this.lpService.updateLabDetails(this.labPayload).subscribe(data=>{
    //  this.dialog.open(InfoDialogComponent, {
    //   width: '500px',
    //   data: 'Lab Details Saved Successfully'
    //  })
    // })
  }


}





