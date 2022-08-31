import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoService {

  constructor(private http: HttpClient) { }

  getProducts(supId: string):Observable<any> {
    return this.http.get(environment.apiUrl + 'supplierproducts/' + localStorage.getItem('branch_id') + '/' + supId);
  }

  createPO(po:any):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'po',po,
      { headers: headers })
  }
}

