import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AptBookingService } from '../apt-booking/apt-booking.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  userData: any;
  aptData: any = [];
  constructor(private login: LoginService, private aptService: AptBookingService) { }

  ngOnInit(): void {
    this.userData = this.login.userData[0];
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.aptService.getAllAppointments().subscribe((response: { data: any; }) => {
      this.aptData = response.data;
    })
  }
}
