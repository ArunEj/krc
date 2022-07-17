import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http:HttpClient) { }

  getPaymentModes(mode:string):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.get(environment.apiUrl + 'billing/'+inv_no,
    //   { headers: headers })
    return this.http.get(environment.apiUrl +'references/'+mode,  { headers: headers })
  }
}
