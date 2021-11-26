import { Component, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { HttpClient } from '@angular/common/http';
import { AptBookingService } from './apt-booking.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apt-booking',
  templateUrl: './apt-booking.component.html',
  styleUrls: ['./apt-booking.component.scss']
})
export class AptBookingComponent implements OnInit {
  aptObj: Appointment = {
    patient_name: '',
    patient_id: '',
    doa: new Date(),
    doctor: '',
    mobile_no: ''
  }
  fetchData = { patient_id: '', patient_name: '' }
  currentDate = new Date();
  constructor(private http: HttpClient,
    private router: Router, private aptService: AptBookingService) { }

  ngOnInit(): void {
  }
  fetchUser() {
    const mobile_no = this.aptObj.mobile_no;
    this.aptService.fetchUserData(this.aptObj.mobile_no).subscribe(response => {
      if (response.patient_id !== '') {
        this.aptObj = response;
        this.aptObj.mobile_no = mobile_no;
      } else {
        alert('no records found');
        this.aptObj.mobile_no = '';
      }

    })

  }
  bookApt() {
    this.aptService.bookApt(this.aptObj).subscribe(response => {
      this.aptObj = {
        patient_name: '',
        patient_id: '',
        doa: new Date(),
        doctor: '',
        mobile_no: ''
      }
      alert('appointment booked')
      this.router.navigate(['landing']);
    })

    //this.router.navigate(['landing']);
  }

}
