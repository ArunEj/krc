import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Patient } from '../patient-registration/patient.model';
import { ManagePatientService } from './manage-patient.service';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {
  phone_no: any;
  patientData: any;
  patient_name: string = '';
  searchType = '';
  patientNameList: Patient[] = [];
  dataSource = new MatTableDataSource(this.patientNameList);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;
  displayedColumns: string[] = ['radio', 'patient_name', 'father_name', 'mobile_no', 'age', 'dob', 'sex', 'patient_type'];
  selectedPerson: any;
  constructor(
    private manageDialog: ManagePatientService, private router: Router
  ) { }

  ngOnInit(): void {

  }

  changeSearchType() {
    this.phone_no = null;
    this.patient_name = '';
  }

  fetchDetails() {
    if (this.searchType === 'phone_no') {
      this.manageDialog.fetchUserData(this.phone_no).subscribe(response => {
        if (response.results && response.results.length > 0) {
          console.log(response);
          this.patientNameList = response.results;
          this.dataSource = new MatTableDataSource(this.patientNameList);
        }
      })
    } else {
      this.manageDialog.fetchUserByName(this.patient_name).subscribe(response => {
        if (response.results && response.results.length > 0) {
          console.log(response);
          this.patientNameList = response.results;
          this.dataSource = new MatTableDataSource(this.patientNameList);
        }
      }, error => {
        alert('no records');
      })
    }

  }

  selectUser() {
    this.router.navigate(['/patient-reg'], { state: this.selectedPerson });
  }

}
