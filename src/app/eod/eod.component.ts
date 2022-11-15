import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EodService } from './eod.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UtilityService } from '../utilities/services/utility.service';
declare var $:any

@Component({
  selector: 'app-eod',
  templateUrl: './eod.component.html',
  styleUrls: ['./eod.component.scss'],
  providers: [DatePipe]
})
export class EodComponent implements OnInit {
  orgId: any;
  branchId: any;
  eodForm!: FormGroup;
  eodData: any;
  setDate: any;
  newEod: any;
  currDate: any;
  newEodStr: any;

  constructor(private eodService: EodService, private formBuilder: FormBuilder,private dialog: MatDialog, private router: Router, 
    private dp: DatePipe, private us: UtilityService) { }

  ngOnInit(): void {
    this.orgId = localStorage.getItem('org_id');
    this.branchId = localStorage.getItem('branch_id');
    this.getEodDetails();
    this.eod();
  }

  
  eod() {
    this.eodForm = this.formBuilder.group(
      {
        eod_date: [this.eodData ? this.eodData.eod_date:'', []],
        supplier_id: [this.eodData ? this.eodData.supplier_id:'', []],
        new_eod_date: [this.eodData ? this.eodData.new_eod_date:'']
      }
    );
  }

  getEodDetails() {
    this.eodService.getEodDetailData(this.orgId, this.branchId).subscribe(data => {
      // console.log("EOD data", data.results);
      this.eodData = data.results[0];
      this.currDate = data.results[0].eod_date;
      this.eodForm.controls.eod_date.setValue(this.currDate);
      console.log(this.eodForm.controls.eod_date);
      this.eod();
      this.setNewEodDate();
    })
  }
  openModal() {
    this.setDate = this.newEodStr;
    let todayDate = (new Date()).getTime();
    let systemNewDate = (new Date(this.setDate)).getTime();
    // console.log(systemNewDate);
    if(todayDate == systemNewDate || todayDate < systemNewDate){
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Your Current Business Date Cannot be Future Date'
      })
      return;
    }
    this.setNewEodDate()
    $("#MyPopup").modal("show");
  }

  openModal1() {
    $("#MyPopup").modal("hide");
    $("#MyPopup1").modal("show");
  }

  close() {
    $("#MyPopup").modal("hide");
  }

  close1() {
    $("#MyPopup1").modal("hide");
  }

  setNewEodDate() {
    let date = new Date(this.currDate);
    this.newEod = date.setDate(date.getDate() + 1);
    this.newEodStr = this.us.convertTodayTostr(date)
    console.log(this.us.convertTodayTostr(date))
    console.log("final---");
  }

  closeModal() {
    $("#MyPopup1").modal("hide");
    let param = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      new_eod_date: this.newEodStr, eod_date: this.currDate
    }
    this.eodService.createEod(param).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'EOD Completed Successfully.  Your Next Business Date : '+ this.us.convertTodayTostrDDMMYYYY(this.newEod)
      })
      this.router.navigate(['/landing'])
    })
  }
}
