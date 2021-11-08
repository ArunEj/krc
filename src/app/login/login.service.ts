import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn = false;
  roleAs:any;
  constructor(private authService:AuthService, private http: HttpClient) { }

  login(loginData:any) {
    this.http.post('https://krcnephrology.herokuapp.com/login.php', { user_id:loginData.userId, pwd:loginData.pwd }).
    subscribe(response=>console.log(response));
    this.authService.login(this.roleAs);
  }

  logout() {
    
  }
  
}
