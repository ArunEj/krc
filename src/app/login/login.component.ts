import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj = { userId: '', pwd: '' }
  validUser: boolean = true;
  constructor(private router: Router,
    private loginService: LoginService, private auth:AuthService) { }

  ngOnInit(): void {
    this.loginService.isUserLoggedIn = false;
  }
  login() {
    this.loginService.login(this.loginObj).subscribe(response => {
      this.validUser = true;
      this.loginService.isUserLoggedIn = true;
      this.loginService.userData = response;
      this.loginService.userDataSubject.next(response);
      this.auth.login(response);
      this.router.navigate(['/landing']);
    }, err => {
      this.validUser = false;
      this.loginService.isUserLoggedIn = false;
    });

  }


}
