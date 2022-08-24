import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EodService } from './eod.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-eod',
  templateUrl: './eod.component.html',
  styleUrls: ['./eod.component.scss']
})
export class EodComponent implements OnInit {
  orgId: any;
  branchId: any;
  eodForm!: FormGroup;
  eodData: any;
  setDate: any;
  newEod: Date | undefined;

  constructor(private eodService: EodService, private formBuilder: FormBuilder,private dialog: MatDialog, private router: Router) { }

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
      console.log("EOD data", data.results);
      this.eodData = data.results[0];
      let date = data.results[0].eod_date;
      date = date.split("-");
      date = date[2] + '-' + date[1] + '-' + date[0];
      this.eodForm.controls.eod_date.setValue(date);
      console.log(this.eodForm.controls.eod_date);
      this.eod();
      this.setNewEodDate();
    })
  }
  openModal() {
    this.setDate =this.eodForm.controls.new_eod_date.value;
    let currDate = new Date();
    // let date = currDate.setDate(currDate.getDate() + 1);
    // let date1 = (new Date(currDate)).toLocaleDateString();
    // let newDate = date1.split("/");
    // let oldDate = this.setDate.split('-');
    // // console.log(newDate);
    // if(newDate[1] == oldDate[0] || newDate[1] < oldDate[0]){
    //   this.dialog.open(InfoDialogComponent, {
    //     width: '400px',
    //     data: 'Cannot moved to Future date'
    //   })
    //   return;
    // }
    this.setNewEodDate()
    $("#MyPopup").modal("show");
  }

  openModal1() {
    $("#MyPopup").modal("hide");
    // this.setDate =this.eodForm.controls.eod_date.value;
    $("#MyPopup1").modal("show");
  }

  close() {
    $("#MyPopup").modal("hide");
  }

  close1() {
    $("#MyPopup1").modal("hide");
  }

  setNewEodDate() {
    this.setDate =this.eodForm.controls.eod_date.value;
    let date = this.setDate.split("-");
    date = new Date(date);
    let final = date.setDate(date.getDate() + 1);
    final = (new Date(final)).toLocaleDateString();
    let final1 = final.split("/");
    final = final1[1]+ '-' + final1[0] + '-' + final1[2];
    console.log(final);
    this.eodForm.controls.new_eod_date.setValue(final);
    console.log(this.eodForm.value);
  }

  closeModal() {
    let newDate = this.eodForm.controls.new_eod_date.value;
    let splitDate = newDate.split('-');
    newDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
    const eodDate = this.eodForm.controls.eod_date.value;
    $("#MyPopup1").modal("hide");
    let param = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      new_eod_date: newDate, eod_date: eodDate
    }
    this.eodService.createEod(param).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'EOD Saved Successfully!!!'
      })
      this.router.navigate(['/landing'])
      // this.getEodDetails();
    })
  }
}
