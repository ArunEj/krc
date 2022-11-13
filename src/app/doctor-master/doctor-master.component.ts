import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-master',
  templateUrl: './doctor-master.component.html',
  styleUrls: ['./doctor-master.component.scss']
})
export class DoctorMasterComponent implements OnInit {
  docForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
}
