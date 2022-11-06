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

  getBranchList():Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'branches/KRC',
    { headers: headers })
  }

  public getEodDetailData(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'eodinfo/' + org_id + '/' + branch_id,
      { headers: headers })
  } 

  fetchBuList(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'business/'+org_id,
      { headers: headers })
  }


  // fetch doctot list from branch id
  fetchDoctors(): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'doctors/' + branch_id,
      { headers: headers })
  }

  // fetch Acc master
  fetchAcMaster(): Observable<any> {
    let org = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'accounts/'+org,
      { headers: headers })
  }
  //http://192.46.215.71:4003/v1/users/KRC/KRC0001
  // fetch emp list
  fetchUsers(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'users/'+org_id+'/'+branch_id,
      { headers: headers })
  }

  fetchProducts(bu:any): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'productmaster/'+org_id+'?bu_id='+bu,
      { headers: headers })
  }

  
  
  getPatientTypes():Observable<any>{
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl+'references/PATTYP')
  }
}
