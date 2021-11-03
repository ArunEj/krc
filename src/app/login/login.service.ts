import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn = false;
  roleAs:any;
  constructor(private authService:AuthService) { }

  login() {
    
    this.authService.login(this.roleAs);
  }

  logout() {
    
  }
  
}
