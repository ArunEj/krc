import { Component, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-apt-booking',
  templateUrl: './apt-booking.component.html',
  styleUrls: ['./apt-booking.component.scss']
})
export class AptBookingComponent implements OnInit {
  aptObj: Appointment = {
    name: '',
    patientId: '',
    aptDate: new Date(),
    doctor: '',
    aptTime: new Date(),
    contact: 0
  }
  currentDate = new Date();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  fetchPatientDetail(){
this.http.get('src/assets/stub/patient.json').subscribe(data=>console.log(data));
  }
  bookApt(){}

}
