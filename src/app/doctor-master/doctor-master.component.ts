import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DoctorMasterService } from './doctor-master.service';

@Component({
  selector: 'app-doctor-master',
  templateUrl: './doctor-master.component.html',
  styleUrls: ['./doctor-master.component.scss']
})
export class DoctorMasterComponent implements OnInit {
  docForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dmService: DoctorMasterService) { }

  ngOnInit(): void {
    this.doc();
  }

  doc() {
    this.docForm = this.formBuilder.group(
      {
        doc_name: ['', []],
        doc_id: ['', ],
        doc_contact: ['', []],
        doc_email: ['', []],
        doc_assistence: ['', []],
        doc_assist_contact: ['', []],
        doc_assist_email: ['', []],
        doc_attach: ['', []]
      }
    );
  }

  createDoc() {
    let dmForm = this.docForm.controls;
    let params={
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      doctor_name: this.docForm.controls.doc_name.value,   
      doctor_contact_no: this.docForm.controls.doc_contact.value,
      doctor_email_id:this.docForm.controls.doc_email.value,
      doctor_assistant_name: this.docForm.controls.doc_assistence.value,   
      doctor_assistant_contact_no: this.docForm.controls.doc_assist_contact.value,
      doctor_asst_emailid: this.docForm.controls.doc_assist_email.value,
      doctor_status:"Y"
    }
    this.dmService.createDM(params).subscribe(data => {
      console.log(data);
    })
  }
}