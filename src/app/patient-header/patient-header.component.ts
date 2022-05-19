import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientHeaderService } from './patient-header.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit {
  @Output()
  outputPatientHeader = new EventEmitter();
  headerDetail: any;
  patientDetail: boolean = false;
  patientHeader: any;
  patientList = [];
  mobile_no: string = '';
  constructor(private patientHeaderService: PatientHeaderService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  fetchUser() {
    this.patientHeaderService.fetchUserData(this.mobile_no).subscribe(data => {
      this.patientDetail = true;
      //this.patientHeader = data.results;
      this.patientList = data.results;
      this.showPatientList(this.patientList);
      
    })
  }

  showPatientList(result: any) {
    const dialogRef = this.dialog.open(PatientListDialogComponent, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe(data => {
      //this.billingItem.patient_id = data.patient_id;
      this.patientHeaderService.fetchHeader(data.patient_id).subscribe(data => {
        this.headerDetail = true;
        this.patientHeader = data;
        this.outputPatientHeader.emit(this.patientHeader);
      });

    })
  }
}
