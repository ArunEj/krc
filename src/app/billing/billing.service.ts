import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BillingService {
  

  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }

  

  fetchUserData(mobile_no:string):Observable<any>{
      return this.http.post('https://krcnephrology.herokuapp.com/patient_hist.php', { mobile_no: mobile_no });
  }
  fetchProductMaster(type:string):Observable<any>{
    return this.http.post('https://krcnephrology.herokuapp.com/fetchproducts.php', { product_type: type });
}
  
}
