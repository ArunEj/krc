import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = false;
    user: any
    roleAs: any;

    constructor() { }

    login(user:any) {
        //let userData = value[0];
        this.isLogin = true;
        this.roleAs = user.user_id;
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('user_id', user.user_id);
        localStorage.setItem('branch_id', user.branch_id);
        localStorage.setItem('org_id',user.org_id)
        localStorage.setItem('branch_name',user.branch_name);
        localStorage.setItem('user_name',user.user_name);
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