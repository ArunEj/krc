import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DocConsultationService {


  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }



  fetchUserData(mobile_no: string): Observable<any> {
    return this.http.post('https://krcnephrology.herokuapp.com/patient_hist.php', { mobile_no: mobile_no });
  }
  submitNotes(docNotes: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'consulting', docNotes,
      { headers: headers })
  }
  updatePatientConsult(docNotes: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'dialysisconsulting', docNotes,
      { headers: headers })
  }


  fetchPrevDeatils(patient_id: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'consult/' + localStorage.getItem('branch_id') + '?patient_id=' + patient_id,
      { headers: headers })
  }

  fetchPrevDialysisDetails(patient_id: string): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'dialysis/' + patient_id,
      { headers: headers })
  }

  //ttp://localhost:4003/v1/consult/KRC001?patient_id=PATKRC00100022

}
