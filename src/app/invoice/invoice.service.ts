import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoice_no: string = '';
  currentBillingArray = [];
  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }



  fetchInvoices(mobile_no: string) {
    return this.http.post('http://www.kkkrchennai.com/krc//billing_header.php', { mobile_no: mobile_no });
  }
 


}
