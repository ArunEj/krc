import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = false;
    user: any
    roleAs: any;

    constructor() { }

    login(value:any) {
        let userData = value[0];
        this.isLogin = true;
        this.roleAs = value;
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('user_id', userData.user_id);
        localStorage.setItem('branch_id', userData.branch_id);
        
      }
    
      logout() {
        this.isLogin = false;
        this.roleAs = '';
        localStorage.clear();
       
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