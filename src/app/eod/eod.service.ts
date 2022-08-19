import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class EodService {

    constructor(public http: HttpClient) {}

    //get supplier ID list
    public getEodDetailData(org_id: any, branchId: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'eodinfo/' + org_id + '/' + branchId,
        { headers: headers})
    }

    //create supplier prod
    public createEod(param: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'eod', param,
        { headers: headers })
    }
}