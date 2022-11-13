import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-s-reg-table',
  templateUrl: './s-reg-table.component.html',
  styleUrls: ['./s-reg-table.component.scss']
})
export class SRegTableComponent implements OnInit {

  @Input() tableData: any;
  @Output() updateEmit = new EventEmitter();
  constructor() { }
  dataSource: any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  displayedColumns: string[] = ['transaction_date', 'product_name', 'opening_stock', 'goods_received', 'goods_sold', 'closing_stock'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
