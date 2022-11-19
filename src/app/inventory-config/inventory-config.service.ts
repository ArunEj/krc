import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class inventoryConfigService {

    constructor(public http: HttpClient) {}

    public createInv(param: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'createinventoryconfig',param,
        { headers: headers})
    }
}