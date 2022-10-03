import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class InvoicePrintService {
    printData: any;

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
    
    fetchInvoiceSection(patient_id: string): Observable<any> {
      let branch_id = localStorage.getItem('branch_id');
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'billings/' + branch_id + '?patient_id=' + patient_id,
        { headers: headers })
    }

    //list
    fetchInvoiceSectionList(inv_status: string, patient_id: string): Observable<any> {
      let branch_id = localStorage.getItem('branch_id');
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'billings/' + branch_id + '?patient_id=' + patient_id + '&inv_status=' + inv_status,
        { headers: headers })
    }

    //set Inv Data
    invData(patient_id: any, invoice_no: any) {
      this.printData = {invoice_no, patient_id};
    }

    //get Inv Data
    getInvData() {
      return this.printData;
    }
}