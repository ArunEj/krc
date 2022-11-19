import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class userMasterService {

    constructor(public http: HttpClient) {}

    createUser(params: any):Observable<any> {
        let headers= new HttpHeaders();
        headers.append('content-Type', 'application/json');
        return this.http.post(environment.apiUrl + 'createuser', params,
        { headers: headers })
    }
}