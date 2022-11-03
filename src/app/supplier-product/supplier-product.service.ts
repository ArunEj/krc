import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class SupplierProductService {

    constructor(public http: HttpClient) {}

    //get supplier ID list
    public getSupplierIdList(org_id: any, branchId: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'suppliers/' + org_id + '/' + branchId,
        { headers: headers})
    }

    //get list data
    public getSupplierProd(branchId: any, supplier_id: any): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(environment.apiUrl + 'supplierproducts/'+ branchId + '/' + supplier_id,
          { headers: headers })
      }

    //create supplier prod
    public createSupplierProd(param: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'supplierprods', param,
        { headers: headers })
    }

    //get product list data
    public getSupplierProdList(bu_id: any, branchId: any, eodDate: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'products/'+ branchId + '?bu_id=' + bu_id +'&eod_date=' + eodDate +'&screen_id=PO',
        { headers: headers })
    }
}