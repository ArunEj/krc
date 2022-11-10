import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {

  constructor(private http:HttpClient) { }

  public createProd(param: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createproduct', param,
      { headers: headers })
  }

  public createProdP(param: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createproductpricing', param,
      { headers: headers })
  }


  public createIP(param: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createproductinsurance', param,
      { headers: headers })
  }

  public sellingPricePerProduct(prd:string):Observable<any>{
    let org = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'prodsellingprice/'+org+'/'+localStorage.getItem('branch_id')+'/'+prd,
      { headers: headers })
  }
}
