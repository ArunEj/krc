import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {
    // console.log(searchValue, value)
    if (!searchValue) return value;
    return value.filter((v: any) => v.supplier_name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}