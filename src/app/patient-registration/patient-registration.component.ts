import { Component, OnInit } from '@angular/core';
import { Patient } from './patient.model';
import { PatientRegService } from './patient_registration.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  updatePatient = false;
  currentDate = new Date();
  patientRegObj: Patient = {
    patient_name: '', dob: '', address: '', sex: '', email_id: '', mobile_no: '', first_visit_date: '',
    communicate_address: '', user_id: '', org_id: '', alt_mobile_no: '', aadhar_no: '', photo: '', alt_email_id: '', branch_id: '',
    age: '', blood_group: '', husband_name: '', guardian_name: '', guardian_type: '', father_name: ''
  };
  constructor(private ps: PatientRegService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (history.state && history.state.patient_id) {
      this.patientRegObj = history.state;
      this.updatePatient = true;
    }
    this.convertTodayTostr();
    const branch = localStorage.getItem('branch_id');
    const org_id = localStorage.getItem('org_id');
    const user = localStorage.getItem('user_id')
    this.patientRegObj.branch_id = branch || '';
    this.patientRegObj.user_id = user || '';
    this.patientRegObj.org_id = org_id || '';
  }
  convertTodayTostr() {
    let temp, fvDate;
   
    if (this.updatePatient) {
      temp = new Date(this.patientRegObj.dob);
      fvDate = new Date(this.patientRegObj.first_visit_date || '');
      let month = this.appendZero(fvDate.getMonth() + 1);
      this.patientRegObj.first_visit_date = fvDate.getFullYear() + '-' + month + '-' + this.appendZero(fvDate.getDate());
    } else {
      temp = new Date();
    }
    let month = this.appendZero(temp.getMonth() + 1);    
    this.patientRegObj.dob = temp.getFullYear() + '-' + month + '-' + this.appendZero(temp.getDate());
  }
  goBack() {
    this.router.navigate(['/landing'])
  }
  appendZero(value: any) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  }
  registerPatient() {
    // this.patientRegObj.updated_date = '2021-06-23';
    this.ps.registerPatient(this.patientRegObj).subscribe(response => {
      //alert('Patient Registered successfully!!!')
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Patient Registered successfully!!!'
      })
      this.router.navigate(['landing']);
    }, error => {
      if (error.error.status === 404) {
        alert(error.error.message);
      }
    });
  }


  updatePatientDetails() {
    this.ps.updatePatient(this.patientRegObj).subscribe(data => {
      //alert('updated');
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Data Updated Successfully'
      })
      this.router.navigate(['/landing'])
    })
  }
}
