import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent implements OnInit {
message:any;

  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent> ,
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
   
    this.dialogRef.close(true);
  }
  }
