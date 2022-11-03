import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class InsSummaryService {

    constructor(public http: HttpClient) {}

    //list
    getInsSummaryList(month: string, year: string): Observable<any> {
        let branch_id = localStorage.getItem('branch_id');
        let org_id = localStorage.getItem('org_id');
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'insentrystatus/' + org_id +'/' + branch_id + '?inv_month=' + month + '&inv_year=' + year,
            { headers: headers })
        }
}