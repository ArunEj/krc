import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { PatientListingReportService } from './patient-listing-report.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { Patient } from '../patient-registration/patient.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ListTable } from './list-table/list-table.component';


@Component({
  selector: 'app-patient-listing',
  templateUrl: './patient-listing-report.component.html',
  styleUrls: ['./patient-listing-report.component.scss']
})
export class PatientListingReportComponent implements OnInit {
  searchType: string = '';
  patient_name: string = '';
  headerDetail: any;
  patientDetail: boolean = true;
  patientHeader: any;
  patientList = [];
  patientNameList: Patient[] = []!;
  mobile_no: string = '';
  dataSource = new MatTableDataSource(this.patientNameList);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  displayedColumns: string[] = ['patient_name', 'father_name', 'mobile_no', 'age', 'dob', 'sex', 'patient_type'];
  selectedPerson: any;
  constructor(private patientHeaderService: PatientListingReportService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUser();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);

  }

  fetchUser() {
    this.patientHeaderService.fetchUserData().subscribe(data => {
      this.patientDetail = true;
      this.patientNameList = data.results;

    })
  }
  fetchUserByName() {
    this.patientHeaderService.fetchUserDataByName(this.patient_name).subscribe(data => {
      this.patientDetail = true;
      this.patientNameList = data.results;
      this.dataSource = data.results;
    })

  }


}
