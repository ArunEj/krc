import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface SupplierDialogData {
  product_price:''
  product_name: '',
  ref_desc: ''
}
@Component({
  selector: 'app-previous-list--dialog',
  templateUrl: './previousprice-list-dialog.component.html',
  styleUrls: ['./previousprice-list-dialog.component.scss']
})
export class PreviousPriceListDialogComponent implements OnInit {
  supPriceList: SupplierDialogData[] = [];
  selectedPatient: any;
  constructor(
    public dialogRef: MatDialogRef<PreviousPriceListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.supPriceList = this.data;
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  }
