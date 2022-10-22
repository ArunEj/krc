import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface payreceipt {
  
  "org_id": string,
  "branch_id": string,
  "trans_id": string,
  "account_type": string,
  "account_code":string,
  "trans_date": string,
  "account_value": number,
  "trans_narration":string,
  "addl_remarks": string,
  "voucher_num": string,
  "voucher_date": string,
  "rp_for": string,
  "rp_name_id": string,
  "rp_name_other": string,
  "payment_mode": string,
  "payment_ref": string,
  "updated_by": string,
  "updated_date": string,
  "created_by": string,
  "created_date": string

}
@Injectable({
  providedIn: 'root'
})
export class UpdatePayreceiptsService {

  constructor(private http:HttpClient) { }

  retrieveData(fromDate:any, toDate:any, type:any):Observable<any>{
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'receiptspayments/'+org_id+'/'+branch_id+'?account_type='+type+'&from_date='+fromDate+'&to_date='+toDate,
      { headers: headers })
    //return this.http.get(environment.apiUrl)

    //http://192.46.215.71:4003/v1/patienttypereport/KRC/KRC0001?from_date=2022-07-04&to_date=2022-07-08
  }

  public getEodDetailData(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'eodinfo/' + org_id + '/' + branch_id,
      { headers: headers })
  }

  inputPayload = {from_date:'', to_date:'', type:'',report:[]};
  reportData:payreceipt[]=[];
}
