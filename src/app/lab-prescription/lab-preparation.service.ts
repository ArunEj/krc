import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabPreparationService {

  constructor(private http:HttpClient) { }

  fetchProducts(eod:string): Observable<any> {
    let patient_type = JSON.parse(localStorage.getItem('header')!).patient_type;
    //let eod = localStorage.getItem('eod');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
   // return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id='+bu,
   return this.http.get(environment.apiUrl + 'products/'+branch_id+'?bu_id=LAB&patient_type='+patient_type+'&eod_date='+eod+'&screen_id=Invoice',
      { headers: headers })
  }


  updateLabDetails(labPayload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'labconsulting', labPayload,
      { headers: headers })
  }

  fetchLastLabDetails(patient_id:any):Observable<any>{
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'lablists/'+patient_id,
      { headers: headers })
  }
}
