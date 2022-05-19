import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  showHeader = false;
  menuEntitlement:any;
  menuObject:any;
  constructor(private http: HttpClient,
    private router:Router, private authService: AuthService,
    private loginService:LoginService) {
      // this.loginService.userDataSubject.subscribe(user=>{
      //   if(user && user.length>0){
      //     this.menuEntitlement= user[0].data;
      //     console.log(this.menuEntitlement)
      //   }
        
      // })

  }
  ngOnInit() {
    this.showHeader = this.authService.isLogin;

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
