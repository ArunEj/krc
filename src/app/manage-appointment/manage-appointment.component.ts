import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.scss']
})
export class ManageAppointmentComponent implements OnInit {
  appointment_payload:any;
  manageAppoint: any = { patient_id: false, phone_no: false, doctor_id: false, appoint_date: false };
  phone_no: string = '';
  patient_id: string = '';
  appoint_date: string = '';
  doctor_id:string='';
  constructor(public dialogRef: MatDialogRef<ManageAppointmentComponent> ) { }

  ngOnInit(): void {
  }

  selectAptType(item: any) {
    let type = item;
    this.manageAppoint[type] = true;
  }

  sendBackPayload() {

    let payload = {
      field: Object.keys(this.manageAppoint).find(key => this.manageAppoint[key] === true),
      phone_no: this.phone_no,
      patient_id: this.patient_id,
      appoint_date: this.appoint_date,
      doctor_id:this.doctor_id
    }
   // this.appointment_payload = payload;
    this.dialogRef.close(payload);
  }


}
