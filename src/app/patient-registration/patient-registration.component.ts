import { Component, OnInit } from '@angular/core';
import { Patient } from './patient.model';
@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  patientRegObj: Patient = { name: '', dob: new Date(), address: '',sex:'', email: '', contact: '', fvDate:new Date(), communicationAddress:'', pincode:'',lastDoc:''};
  constructor() { }

  ngOnInit(): void {
  }
  registerPatient() {
console.log(this.patientRegObj);
  }
}
