import { Component, OnInit } from '@angular/core';
import { DocConsultationService } from './doc-consultation.service';
@Component({
  selector: 'app-doc-consultation',
  templateUrl: './doc-consultation.component.html',
  styleUrls: ['./doc-consultation.component.scss']
})
export class DocConsultationComponent implements OnInit {
  mobile_no: string = '';
  patientObj: any;
  patientDetail: boolean = false;
  patientHistory = [];
  currentPatientDetail: any;
  constructor(private docService: DocConsultationService) { }

  ngOnInit(): void {
  }
  fetchUser() {
    this.docService.fetchUserData(this.mobile_no).subscribe(data => {
      this.patientDetail = true;
      this.patientHistory = data;
      this.setCurrentPatientData();
      console.log(data);
    })
  }
  setCurrentPatientData() {
    this.currentPatientDetail = this.patientHistory[this.getLastRecordIndex()];
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

  nextItem(){
    this.prevCounter--;
    this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
    this.currentPatientDetail = this.patientHistory[this.recordIndex]; // give us back the item of where we are now
  }
}
