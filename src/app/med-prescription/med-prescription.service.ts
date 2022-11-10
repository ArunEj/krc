import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedPreparationService {

  constructor(private http:HttpClient) { }

  fetchProducts(bu:string, eod:string): Observable<any> {
    let patient_type = JSON.parse(localStorage.getItem('header')!).patient_type;
    //let eod = localStorage.getItem('eod');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
   // return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu,
   return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu + '&patient_type='+patient_type+'&eod_date='+eod+'&screen_id=Invoice',
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
    return this.http.get(environment.apiUrl + 'pharmlists/'+patient_id,
      { headers: headers })
  }
  
}
