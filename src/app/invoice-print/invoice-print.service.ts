import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class InvoicePrintService {

    constructor(public http: HttpClient) {}


    public getInvoiceList(inv_no: any, pt_id: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
        const api_url = this.getInvoiceListUrl(inv_no,pt_id);
        console.log("api_url",api_url)
        return this.http.get(api_url, httpOptions);
      }

    private getInvoiceListUrl(inv_no: any, pt_id: any) {
    const baseUrl = environment.apiUrl;
    let returnUrl = baseUrl + "invoicereport/" + pt_id + "/" + inv_no;
    return returnUrl;
    }
    
    // public getInvoiceTableList(): Observable<any> {
    //   const api_url = this.getInvoiceTableUrl();
    //   return this.http.get(api_url);
    // }

    // private getInvoiceTableUrl() {
    // const baseUrl = this.config.getApiUrl();
    // let returnUrl = baseUrl + "/v1" + "/invoiceestimatereport" + "/PATKRC000100002" + "/INVKRC00010000000008";
    // return returnUrl;
    // }
}