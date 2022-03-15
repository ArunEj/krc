import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  invoice_no: string = '';
  currentBillingArray = [];
  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }



  
  fetchItemsUnderInvoice(invoice: string): Observable<any> {
    return this.http.post('http://www.kkkrchennai.com/krc/view_one_invoice.php', { invoice_no: invoice });
  }


  submitPayment(billingItem: any): Observable<any> {
    return this.http.post('http://www.kkkrchennai.com/krc/paymentsave.php', billingItem);
  }


}
