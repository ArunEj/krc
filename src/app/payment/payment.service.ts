import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  getPaymentTypes():Observable<any>{
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl+'references/PAYMOD')
  }


  submitPayment(billingItem: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'paymentcreation',billingItem,
      { headers: headers })
  }
  fetchBillingDetail(inv_no:string):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'billingbudetails/'+inv_no,
      { headers: headers })
  }


  fetchBilling(inv_no:string):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'billing/'+inv_no,
      { headers: headers })
  }
 

}
