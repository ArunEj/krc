import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn = false;
  roleAs: any;
  userData: any;
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }

  login(loginData: any) {
    return this.http.post('http://www.kkkrchennai.com/krc/login.php', { user_id: loginData.userId, pwd: loginData.pwd })
  }


  getUserData() {
    return this.userData;
  }

  logout() {

  }

}
