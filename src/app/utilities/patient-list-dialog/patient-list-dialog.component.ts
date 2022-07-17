import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface PatientDialogData {

  patient_id: '',
  patient_name: ''
}
@Component({
  selector: 'app-patient-list--dialog',
  templateUrl: './patient-list-dialog.component.html',
  styleUrls: ['./patient-list-dialog.component.scss']
})
export class PatientListDialogComponent implements OnInit {
  patientList: PatientDialogData[] = [];
  selectedPatient: any;
  constructor(
    public dialogRef: MatDialogRef<PatientListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.patientList = this.data;
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  }
