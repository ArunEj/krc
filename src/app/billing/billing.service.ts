import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BillingService {

  invoice_no: string = '';
  patient_id: string = '';
  currentBillingArray = [];
  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }



  fetchUserData(mobile_no: string): Observable<any> {
    return this.http.post('https://krcnephrology.herokuapp.com/billing_header.php', { mobile_no: mobile_no });
  }
  fetchProductMaster(type: string): Observable<any> {
    // return this.http.post('https://krcnephrology.herokuapp.com/fetchproducts.php', { product_type: type });
    return this.http.post('http://www.kkkrchennai.com/krc/fetchproducts.php', { product_type: type });
  }
  submitInvoice(billingArray: any): Observable<any> {
    return this.http.post('https://krcnephrology.herokuapp.com/invoicesave.php', billingArray);
  }
  submitInvoiceMock(billingArray: any): Observable<any> {
    return this.http.get('assets/stub/billing_item.json');
  }

}
