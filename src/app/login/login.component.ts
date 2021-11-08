import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj = { userId: '', pwd: '' }
  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isUserLoggedIn = false;
  }
  login() {
    this.loginService.login(this.loginObj);

  }


}
