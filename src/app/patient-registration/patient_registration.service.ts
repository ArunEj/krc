import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientRegService {


  constructor(private authService: AuthService,
    private route: Router, private http: HttpClient) { }




  registerPatient(patientObj: any) {
    return this.http.post('http://www.kkkrchennai.com/krc/patient-save.php', patientObj);
  }

}
