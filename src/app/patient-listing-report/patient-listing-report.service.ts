import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientListingReportService {

  constructor(private http:HttpClient) { }

  fetchHeader(patient_id:string):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patientheader/'+patient_id,
      { headers: headers })
    
  }

  fetchUserDataByNo(mobile_no: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patients/' + localStorage.getItem('branch_id') + '?mobile_no=' + mobile_no,
      { headers: headers })
  }

  fetchUserData(): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patients/' + localStorage.getItem('branch_id'),
      { headers: headers })
  }

  fetchUserDataByName(patient_name:string):Observable<any>{
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patients/' + localStorage.getItem('branch_id') + '?patient_name=' + patient_name,
      { headers: headers })
  }
}
