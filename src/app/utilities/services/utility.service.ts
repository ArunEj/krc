import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  convertTodayTostr(date?:any) {
    let temp = (date)?new Date(date):new Date();
    let month = this.appendZero(temp.getMonth() + 1);
    return temp.getFullYear() + '-' + month + '-' + this.appendZero(temp.getDate());
  }
  appendZero(value: any) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  }


}
