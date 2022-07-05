import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedPreparationService {

  constructor(private http:HttpClient) { }

  fetchProducts(bu:string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu,
      { headers: headers })
  }


  updatePharmaDetails(labPayload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'pharmconsulting', labPayload,
      { headers: headers })
  }
  fetchLastPharmaDetails(patient_id:any):Observable<any>{
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'previouspharma/'+patient_id,
      { headers: headers })
  }
  
}
