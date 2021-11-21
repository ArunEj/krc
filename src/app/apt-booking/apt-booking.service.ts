import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AptBookingService {
  

  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }

  

  fetchUserData(contact_no:string):Observable<any>{
      return this.http.post('https://krcnephrology.herokuapp.com/fetchdata.php', { contact_no: contact_no });
  }

  bookApt(aptObj:any){
      return this.http.post('https://krcnephrology.herokuapp.com/appt-save.php', aptObj);
    }

}
