import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface SupplierDialogData {
  supplier_id:''
  supplier_name: '',
  purchase_price: ''
}
@Component({
  selector: 'app-supplier-list--dialog',
  templateUrl: './supplier-list-dialog.component.html',
  styleUrls: ['./supplier-list-dialog.component.scss']
})
export class SupplierListDialogComponent implements OnInit {
  supPriceList: SupplierDialogData[] = [];
  selectedPatient: any;
  constructor(
    public dialogRef: MatDialogRef<SupplierListDialogComponent>,
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
