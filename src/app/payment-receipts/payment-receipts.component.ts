import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PaymentReceiptsService } from './payment-receipts.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-receipts',
  templateUrl: './payment-receipts.component.html',
  styleUrls: ['./payment-receipts.component.scss']
})
export class PaymentReceiptsComponent implements OnInit {

  paymentModes: any = [];
  doctors: any = [];
  subledger: any = [];
  suppliers: any = [];
  acMaster: any = [];
  users: any = [];
  branchList: any = [];
  branch = localStorage.getItem('branch_id')
  myForm: FormGroup = this.fb.group({
    branch_id: [null, { Validators: [Validators.required] }],
    trans_date: [null, { Validators: [Validators.required] }],
    payment_mode: [null, {}],
    account_value: [null, {}],
    rp_for: [null, {}],
    rp_name_id: [null, {}],
    payment_ref: [null, {}],
    rp_name_other: [null, {}],
    trans_id: [null, {}],
    account_code: [null, {}],
    voucher_num: [null, {}],
    voucher_date: [null, {}],
    addl_remarks: [null, {}],
    trans_narration: [null, {}]
  })

  payReceiptItem = {
    "org_id": localStorage.getItem('org_id'),
    "user_id": localStorage.getItem('user_id'),
    branch_id: '',
    trans_date: '',
    account_type: 'R',
    payment_mode: '',
    account_value: 0,
    rp_for: '',
    rp_name_id: '',
    payment_ref: '',
    rp_name_other: '',
    trans_id: '',
    account_code: '',
    "trans_narration": "",
    "addl_remarks": "",
    "voucher_num": "",
    "voucher_date": ""
  }
  constructor(private fb: FormBuilder, private location: Location,
    private router: Router, private dialog: MatDialog, private prs: PaymentReceiptsService
    , private route: ActivatedRoute) {

  }
  readonlyReceipts = false;
  ngOnInit(): void {
    if (history.state?.account_value) {
      this.payReceiptItem = history.state;
      this.fetchDcotors();
      this.readonlyReceipts = true;
    }
    this.getBranch();
    this.changeAccount()
    this.getEOD();
    this.getPayModes();
  }
  // getAcMaster() {
  //   this.prs.fetchAcMaster().subscribe(data => {
  //     this.acMaster = data.results;
  //   })
  // }
  displayDate = ''
  getBranch() {
    this.prs.getBranchList().subscribe(data => {
      this.branchList = data.results;
    })
  }

  getEOD() {
    this.prs.getEodDetailData().subscribe(data => {
      this.payReceiptItem.trans_date = data.results[0].eod_date
      let date = data.results[0].eod_date;
      date = date.split("-");
      date = date[2] + '-' + date[1] + '-' + date[0];
      this.displayDate = date;
    })
  }
  getPayModes() {
    this.prs.getPaymentModes('PAYMOD').subscribe(data => {
      this.paymentModes = data.results;
    });
    this.prs.getPaymentModes('RPFOR').subscribe(data => {
      this.subledger = data.results;
    });
  }
  changeAccount() {
    this.prs.fetchAcMasterByType(this.payReceiptItem.account_type).subscribe(data => {
      this.acMaster = data.results
    })
  }

  changeSubledger() {
    this.fetchDcotors();
  }
  fetchDcotors() {
    if (this.payReceiptItem.rp_for === 'D') {
      this.prs.fetchDoctors().subscribe(data => {
        this.doctors = data.results;
      })
    } else if (this.payReceiptItem.rp_for === 'S') {
      this.getSupplierList();
    } else if (this.payReceiptItem.rp_for === 'E') {
      this.getUsers()
    }

  }

  getSupplierList() {
    let branchId = localStorage.getItem('branch_id');
    this.prs.getSupplierList(branchId).subscribe(data => {
      console.log("supplier", data.results);
      this.suppliers = data.results;
    })
  }
  getUsers() {
    this.prs.fetchUsers().subscribe(data => {
      this.users = data.results;
    })
  }

  selectName(event: any) {
    switch (this.payReceiptItem.rp_for) {
      case 'D': {
        this.payReceiptItem.rp_name_other = event.doctor_name;
        return;
      }
      case 'E': {
        this.payReceiptItem.rp_name_other = event.user_name;
        return;
      }
      case 'S': {
        this.payReceiptItem.rp_name_other = event.supplier_name;
        return;
      }
      default: {
        return;
      }
    }


  }
  save() {
    console.log(this.payReceiptItem)
    this.prs.submitPayment(this.payReceiptItem).subscribe(data => {
      this.payReceiptItem.trans_id = data.trans_id;
      const dialog = this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Payment/Receipts Saved Successfully!!!'
      });
      dialog.afterClosed().subscribe(data => {
        if (history.state.account_value) {
          this.router.navigate(['/update-payreceipts'])
        } else {
          this.router.navigate(['/landing'])
        }

      })

    })

  }


}
