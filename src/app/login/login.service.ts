import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn = false;
  roleAs: any;
  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }

  login(loginData: any) {
    return this.http.post('https://krcnephrology.herokuapp.com/login.php', { user_id: loginData.userId, pwd: loginData.pwd })
  }

  logout() {

  }

}
