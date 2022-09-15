import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cancel-invoice-dialog',
  templateUrl: './cancel-invoice-dialog.component.html',
  styleUrls: ['./cancel-invoice-dialog.component.scss']
})
export class CancelInvoiceDialogComponent implements OnInit {
message:any;
remarks:any
  constructor(
    public dialogRef: MatDialogRef<CancelInvoiceDialogComponent> ,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.message = this.data;
  }  
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelItem():void{
   
    this.dialogRef.close(this.remarks);
  }
  }
