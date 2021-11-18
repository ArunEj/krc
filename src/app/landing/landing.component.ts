import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
userData:any;
  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.userData = this.login.userData[0];
  }

}
