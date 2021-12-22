import { Component, OnInit } from '@angular/core';
import { Patient } from './patient.model';
import { PatientRegService } from './patient_registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  patientRegObj: Patient = {
    patient_name: '', dob: '', add1: '', sex: '', email: '', mobile_no: '', first_visit_date: '',
    add2: '', phone: '', aadhar_no: '', photo: '', other_email: '', branch_id: '', updated_by: '', updated_date:''
  };
  constructor(private ps: PatientRegService, private router:Router) { }

  ngOnInit(): void {
    const branch = localStorage.getItem('branch_id');
    const user = localStorage.getItem('user_id')
    this.patientRegObj.branch_id = branch || '';
    this.patientRegObj.updated_by = user || '';
  }
  registerPatient() {
   // this.patientRegObj.updated_date = '2021-06-23';
    this.ps.registerPatient(this.patientRegObj).subscribe(response=>{      
      alert('Patient Registered successfully!!!')
      this.router.navigate(['landing']);
    });
  }
}
