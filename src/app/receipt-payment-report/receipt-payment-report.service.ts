import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class receiptPaymentReportsService {

    constructor(private http: HttpClient) { }

    retrieveData(branchId: any, fromDate: any, toDate: any):Observable<any>{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'receiptpaymentreport/KRC/'+branchId+'?from_date='+fromDate+'&to_date'+toDate,
      { headers: headers })
    }
}