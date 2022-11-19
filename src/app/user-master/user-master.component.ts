import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { userMasterService } from './user-master.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {

  userMasterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private umService: userMasterService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.userMaster();
  }

  userMaster() {
    this.userMasterForm = this.formBuilder.group(
      {
        user_name: ['', []],
        branch_id: ['', ],
        dob: ['', []],
        doj: ['', []],
        mobile_no: ['', ],
        home_contact_no: ['', []],
        residence_address: ['', []],
        email_id: ['', ],
        aadhar_no: ['', []],
        pan_no: ['', []],
        passport: ['', []],
        signature: ['', ],
        bank_account_no: ['', []],
        ifsc_code: ['', []],
        bank_name: ['', ],
        bank_address: ['', []],
        attached_branch: ['', []],
        pf_employee: ['', ],
        pf_start_date: ['', []],
        pf_number: ['', []],
        user_type: ['', ],
        user_status: ['', []],
        pwd: ['']
      }
    );
  }

  submit() {
    
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      user_name: this.userMasterForm.controls.user_name.value,
      dob: this.userMasterForm.controls.dob.value,
      doj: this.userMasterForm.controls.doj.value,
      mobile_no: this.userMasterForm.controls.mobile_no.value,
      home_contact_no: this.userMasterForm.controls.home_contact_no.value,

      residence_address: this.userMasterForm.controls.residence_address.value,
      email_id: this.userMasterForm.controls.email_id.value,
      aadhar_no: this.userMasterForm.controls.aadhar_no.value,
      pan_no: this.userMasterForm.controls.pan_no.value,
      passport: this.userMasterForm.controls.passport.value,

      signature: this.userMasterForm.controls.signature.value,
      bank_account_no: this.userMasterForm.controls.bank_account_no.value,
      ifsc_code: this.userMasterForm.controls.ifsc_code.value,
      bank_name: this.userMasterForm.controls.bank_name.value,
      bank_address: this.userMasterForm.controls.bank_address.value,

      attached_branch: this.userMasterForm.controls.attached_branch.value,
      pf_employee: this.userMasterForm.controls.pf_employee.value,
      pf_start_date: this.userMasterForm.controls.pf_start_date.value,
      pf_number: this.userMasterForm.controls.pf_number.value,
      user_type: this.userMasterForm.controls.user_type.value,

      user_status: this.userMasterForm.controls.user_status.value,
      pwd: this.userMasterForm.controls.pwd.value
    }
    this.umService.createUser(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'User Master Saved Successfully!!!'
      })
    })
    // this.userMasterForm.reset();
  }

}
