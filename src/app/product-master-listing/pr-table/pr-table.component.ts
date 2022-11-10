import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-pm-table',
  templateUrl: './pr-table.component.html',
  styleUrls: ['./pr-table.component.scss']
})
export class PMTableComponent implements OnInit {
  @Input() tableData: any;
  @Input() eoDate: any;
  @Output() updateEmit = new EventEmitter();
  @Output() emitNP = new EventEmitter();
  constructor() { }
  dataSource: any;
  showNP = false;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayedColumns = ['product_name', 'uom', 'stock_in_hand','max_stock','min_stock','reorder_level','prod_name_invoice','product_price','action', 'insurancepricing'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  update(element: any) {
    this.updateEmit.emit(element);
  }

  redirectNormalPricing(element: any) {
    element.np = true;
    this.emitNP.emit(element);
  }

  redirectIP(element:any){
    element.np = false;
    this.emitNP.emit(element);
  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */