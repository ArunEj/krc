import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class InsuranceService {
    setInsData: any;

    constructor(public http: HttpClient) {}


    public getInvoiceList(inv_no: any, pt_id: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
        const api_url = this.getInvoiceListUrl(inv_no,pt_id);
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
      return this.http.get(environment.apiUrl + 'billings/' + branch_id + '?patient_id=' + patient_id + '&INVSTA',
        { headers: headers })
    }

    //list
    fetchInvoiceSectionList(inv_status: string): Observable<any> {
      let branch_id = localStorage.getItem('branch_id');
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'billings/' + branch_id + '?inv_status=' + inv_status,
        { headers: headers })
    }

    //bu list
    fetchBuList(): Observable<any> {
      let org_id = localStorage.getItem('org_id');
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'business/'+org_id,
        { headers: headers })
    }

    //submit header Insurance
    submitInsurance(dataArray: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'patientinsurance',dataArray,
        { headers: headers })
    }  

    //get ins header
    fetchInsHeader(data: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'patientinslists?' + 'patient_id=' + data,
        { headers: headers })
    }

    //save Ins Data
    saveInsData(dataArray: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'patientinsurancedetail',dataArray,
        { headers: headers })
    } 

    //fetch Ins Data
    fetchInsData(month: any, year: any, patient_id: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.apiUrl + 'patientinsdetail/' + patient_id + '?inv_month='+month+ '&inv_year='+year)
    } 

    //Print Insurance Data
    printInsData(params: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(environment.apiUrl + 'patientinsurancereport',params,
        { headers: headers })
    }

    //set insurance data
    setInsurancedata(data: any) {
      console.log(data);
      this.setInsData = data;
    }

    getInsurancedata(){
      return this.setInsData;
    }
}