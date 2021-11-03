import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = false;
    user: any
    roleAs: any;

    constructor() { }

    login(value: string) {
        this.isLogin = true;
        this.roleAs = value;
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', this.roleAs);
        
      }
    
      logout() {
        this.isLogin = false;
        this.roleAs = '';
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('ROLE', '');
       
      }
    getUser() {
        return this.user;
    }
    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true')
            this.isLogin = true;
        else
            this.isLogin = false;
        return this.isLogin;
    }

    getRole() {
        this.roleAs = localStorage.getItem('ROLE');
        return this.roleAs;
    }

}