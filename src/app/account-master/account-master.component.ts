import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountMasterService } from './account-master.service';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.scss']
})
export class AccountMasterComponent implements OnInit {
  accForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private amService: AccountMasterService) { }

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

  submit() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      user_id: localStorage.getItem('user_id'),
      account_type: this.accForm.controls.accType.value,
      account_desc: this.accForm.controls.acc_desc.value  
    }
    this.amService.createAM(params).subscribe(data => {
      console.log(data);
    })
  }
}