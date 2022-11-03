import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-pr-table',
  templateUrl: './pr-table.component.html',
  styleUrls: ['./pr-table.component.scss']
})
export class PrTableComponent implements OnInit {
  @Input() tableData: any;
  @Input() eoDate: any;
  @Output() updateEmit = new EventEmitter();
  constructor() { }
  dataSource: any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayedColumns = ['trans_id', 'account_value','payment_mode_name', 'rp_name_other', 'trans_narration','voucher_num','trans_date','account_code', 'action'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  update(element: any) {
    this.updateEmit.emit(element);
  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */