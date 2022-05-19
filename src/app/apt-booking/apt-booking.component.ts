import { Component, Inject, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { HttpClient } from '@angular/common/http';
import { AptBookingService } from './apt-booking.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';

export interface doctor {
  doctor_name: string;
  doctor_id: string;
};


@Component({
  selector: 'app-apt-booking',
  templateUrl: './apt-booking.component.html',
  styleUrls: ['./apt-booking.component.scss']
})
export class AptBookingComponent implements OnInit {

  updateApt = false;
  doctorList: doctor[] = [];
  aptObj: Appointment = {
    patient_name: '',
    patient_id: '',
    appoint_date: new Date(),
    doctor_id: '',
    phone_no: '',
    ailment: ''
  }
  updateAppointObj: Appointment = {
    patient_id: '',
    appoint_date: new Date(), phone_no: '',
  }
  fetchData = { patient_id: '', patient_name: '' }
  currentDate = new Date();
  constructor(private http: HttpClient,
    private router: Router,
    private dialog: MatDialog, private aptService: AptBookingService) { }

  ngOnInit(): void {
    this.convertTodayTostr();
    this.fetchDoctorsByBranchId();
    if (history.state && history.state.phone_no) {
      this.aptObj = history.state;
      this.updateApt = true;
    }

  }
  convertTodayTostr(){
    let temp = new Date();
    let month = this.appendZero(temp.getMonth()+1);
    this.aptObj.appoint_date = temp.getFullYear()+'-'+month+'-'+this.appendZero(temp.getDate());
  }
  appendZero(value: any) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  }
  fetchDoctorsByBranchId() {
    this.aptService.fetchDoctors().subscribe(data => {
      this.doctorList = data.results;
    })
  }
  patientAvailable = false;
  fetchUser() {
    const mobile_no = this.aptObj.phone_no;
    this.aptService.fetchUserData(this.aptObj.phone_no).subscribe(response => {
      let result = response.results;     
      console.log(result);
      this.showPatientList(result);
    }, error=>{
      if(error.error.status === 404){
        //alert(error.error.message); 
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: error.error.message,
        });     
      }
    })

  }
  showPatientList(result: any) {
    const dialogRef = this.dialog.open(DialogPatientList, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe(data => {
      this.aptObj.patient_id = data.patient_id;
      this.aptObj.patient_name = data.patient_name;
    })
  }
  updateAppointment() {
    this.aptObj.branch_id = localStorage.getItem('branch_id') || undefined;
    this.aptObj.org_id = localStorage.getItem('org_id') || undefined;
    

    this.aptService.updateApt(this.aptObj).subscribe(response => {
      this.aptObj = {
        patient_name: '',
        patient_id: '',
        appoint_date: new Date(),
        doctor_id: '',
        phone_no: '',
        ailment: ''
      }
     
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Appointment Updated',
      });
      this.router.navigate(['landing']);
    })
  }
  bookApt() {
    
      console.log(this.aptObj);
      this.aptObj.branch_id = localStorage.getItem('branch_id') || undefined;
      this.aptObj.org_id = localStorage.getItem('org_id') || undefined;
      // this.aptObj.appointment_time = '09:02:44';
      this.aptService.bookApt(this.aptObj).subscribe(response => {
        this.aptObj = {
          patient_name: '',
          patient_id: '',
          appoint_date: new Date(),
          doctor_id: '',
          phone_no: '',
          ailment: ''
        }
       
       const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Appointment Booked',
      });
        this.router.navigate(['landing']);
      }, error=>{
        if(error.error.status === 404){
          //alert(error.error.message); 
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: error.error.message,
          });     
        }
      })
    
   

    //this.router.navigate(['landing']);
  }
  goBack() {
    this.router.navigate(['/landing'])
  }

}
export interface PatientDialogData {

  patient_id: '',
  patient_name: ''
}
@Component({
  selector: 'dialog-patient-list',
  templateUrl: 'dialog-patient-list.html',
  styleUrls: ['dialog-patient.scss']
})
export class DialogPatientList implements OnInit {
  patientList: PatientDialogData[] = [];
  selectedPatient: any;
  constructor(
    public dialogRef: MatDialogRef<DialogPatientList>,
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