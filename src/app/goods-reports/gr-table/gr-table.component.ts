import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-gr-table',
  templateUrl: './gr-table.component.html',
  styleUrls: ['./gr-table.component.scss']
})
export class GrTableComponent implements OnInit {

  @Input() tableData: any;
  @Output() updateEmit = new EventEmitter();
  constructor() { }
  dataSource: any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayedColumns: string[] = ['supplier_name', 'po_no', 'po_date', 'supplier_inv_no', 'supplier_inv_date', 'item_description', 'po_qty_ordered', 'supplier_qty', 'balance_qty', 'gr_status'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
