import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })

export class SupplierPaymentService {

    constructor(public http: HttpClient) {}

    public getPoSuppPay(branch_id: any, supplierId: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + "popayschedulelists/KRC/" + branch_id +"/supplier_id=" +supplierId +"?payment_status=U",
          { headers: headers })
    }
}