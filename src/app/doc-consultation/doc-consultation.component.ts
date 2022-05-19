import { Component, OnInit } from '@angular/core';
import { DocConsultationService } from './doc-consultation.service';
import { PatientHeaderComponent } from '../patient-header/patient-header.component';
import { LabPrescriptionComponent } from '../lab-prescription/lab-prescription.component';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-doc-consultation',
  templateUrl: './doc-consultation.component.html',
  styleUrls: ['./doc-consultation.component.scss']
})
export class DocConsultationComponent implements OnInit {
  mobile_no: string = '';
  headerDetailFound = false;
  docNotes: string = '';
  dialysisNotes:string='';
  headerDetail: any;
  consultObj = {};
  patientHistory: any;
  currentPatientDetail = { doctor_notes: '' };
  constructor(private docService: DocConsultationService,
    private utility: UtilityService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  patientHeader(data: any) {
    this.headerDetail = data;
    this.docService.fetchPrevDeatils(this.headerDetail.patient_id).subscribe(data => {
      console.log(data.results);
      this.patientHistory = data.results;
      this.setCurrentPatientData();
    })
  }
  saveNotes() {
    this.consultObj = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "doctor_id": localStorage.getItem('user_id'),
      "user_id": localStorage.getItem('user_id'),
      "business_id": "",
      "visit_date": this.utility.convertTodayTostr(),
      "prev_visit_date": "",
      "prev_history": "",
      "doctor_notes": this.docNotes
    }
    this.docService.submitNotes(this.consultObj).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Notes Saved Successfully'
      })
    });
  }

  saveDialysisNotes(){

  }
  setCurrentPatientData() {
    this.currentPatientDetail = this.patientHistory[this.getLastRecordIndex()];
    if (this.getLastRecordIndex() === 0) {
      this.recordIndex = 0;
    }
  }
  prevCounter = 0;
  recordIndex: number | undefined;
  getLastRecordIndex() {
    return this.patientHistory.length - 1;
  }
  prevItem() {
    this.prevCounter++;
    this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
    this.currentPatientDetail = this.patientHistory[this.recordIndex]; // give us back the item of where we are now
  }

  nextItem() {
    this.prevCounter--;
    this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
    this.currentPatientDetail = this.patientHistory[this.recordIndex]; // give us back the item of where we are now
  }
}
