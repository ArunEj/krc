import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
  styleUrls: ['./view-product-dialog.component.scss']
})
export class ViewProductDialogComponent implements OnInit {
  productList:any;

  constructor(
    public dialogRef: MatDialogRef<ViewProductDialogComponent> ,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.productList = this.data;
  }  
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelItem():void{   
    this.dialogRef.close(true);
  }
  }
