import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.scss']
})
export class AccountMasterComponent implements OnInit {
  accForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.acc();
  }

  acc() {
    this.accForm = this.formBuilder.group(
      {
        acc_type: ['', []],
        receipt: ['', ],
        payment: ['', []],
        acc_code: ['', []],
        acc_desc: ['', []],
        status: ['', []]
      }
    );
  }
}