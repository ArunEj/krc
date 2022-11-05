import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class supplierReportsService {

    constructor(private http: HttpClient) { }

    getTableData(poNumber: any):Observable<any>{
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'supplierproductdetail/'+ poNumber,
        { headers: headers })
      }
}