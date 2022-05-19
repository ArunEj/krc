import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn = false;
  roleAs: any;
  userData: any;
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
     private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://172.105.36.229:4003/v1/login',
      { user: { user_id: loginData.userId, pwd: loginData.pwd } }, { headers: headers })
  }


  getUserData() {
    return this.userData;
  }

  logout() {

  }

}
