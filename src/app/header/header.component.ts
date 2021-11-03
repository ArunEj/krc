import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showHeader = false;
  constructor(private http: HttpClient,
    private router:Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.showHeader = this.authService.isLogin;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
