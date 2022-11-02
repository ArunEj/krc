import { Component, OnInit } from '@angular/core';
import { PoSubmissionService } from './po-submission.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-po-submission',
  templateUrl: './po-submission.component.html',
  styleUrls: ['./po-submission.component.scss']
})
export class PoSubmissionComponent implements OnInit {
  poSubForm!: FormGroup;
  branchList: any;
  supplierIdData: any;
  poList: any;
  poTableData: any[] = [];
  poDraftData: any;
  prodList: any;
  grandTotal: any;
  poSubData: any[] = [];
  count: any = 0;

 
  constructor(private poSubmission: PoSubmissionService, private dialog:MatDialog, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBranch();
    this.poSub();
    this.loadBranchData();
  }

  loadBranchData() {
    const id = localStorage.getItem('branch_id');
    this.poSubForm.controls.branch_id.setValue(id);
    this.getSupplierList();
  }

  poSub() {
    this.poSubForm = this.formBuilder.group(
      {
        branch_id: ['', []],
        supplier_id: ['', ],
        supplier_name: ['', []],
        po_number: ['', []],
        po_date: ['', []],
        po_value: ['', []],
        supInvVal: ['', []],
        paidSup: ['', []],
        balSup: ['', []],
        po_status: ['', []],
        goods_rcpt_status: [''],
        item_code: [''],
        item_desc: [''],
        item_cost: [''],
        qty_ordered: [''],
        net_value: [''],
        exp_del_date: [''],
        del_branch_id: [''],
        remarks: ['']
      }
    );
  }

  getBranch(){
    this.poSubmission.getBranchList().subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }

  getSupplierList(){
    const branchId = this.poSubForm.controls.branch_id.value;
    this.poSubmission.getSupplierList(branchId).subscribe(data => {
      console.log(data);
      this.supplierIdData = data.results;
    })
  }

  getSupplierPo(){
    const branchId = this.poSubForm.controls.branch_id.value;
    const supplierId = this.poSubForm.controls.supplier_id.value; 
    this.poSubmission.getSupplierListByPo(branchId, supplierId).subscribe(data => {
      console.log("PO", data);
      this.poList = data.results;
    })
  }

  getPo(){
    const poNumber = 'POKRC0001000013';
    this.poSubmission.getPoList(poNumber).subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }

  setPoData(poValue: any) {
    const num = poValue;
    const poData = this.poDraftData.find((element: any) => element.po_number == num); 
    console.log("poData", poData)
    this.poList = poData.po_details;
    // this.poSubForm.controls.po_value.setValue(poData.po_value);
    // this.poSubForm.controls.po_status.setValue(poData.po_status);
    // this.poSubForm.controls.goods_rcpt_status.setValue(poData.goods_rcpt_status);
    this.getPoList()
  }

  getPoList(){
    const branchId = this.poSubForm.controls.branch_id.value;
    const supplierId = this.poSubForm.controls.supplier_id.value;
    const poStatus = 'D';
    this.poSubmission.getPoDraftData(branchId, supplierId, poStatus).subscribe(data => {
      console.log("po list", data);
      this.poDraftData = data.results;
    })
  }

  //Set Supplier Name
  onChangeSupplier() {
    this.poSubForm.controls.po_status.setValue('D');
    this.poSubForm.controls.goods_rcpt_status.setValue('P');
    const name = this.poSubForm.controls.supplier_name.value;
    const suppData = this.supplierIdData.find((element: any) => element.supplier_name == name); 
    this.poSubForm.controls.supplier_id.setValue(suppData.supplier_id);
    this.getPoList();
  }


  setItemCode() {
    const desc = this.poSubForm.controls.item_desc.value;
    const item = this.prodList.find((element:any) => element.product_name == desc);
    this.poSubForm.controls.item_code.setValue(item.product_id);
  }

  submitPoSupplier() {
    if(this.poTableData.length <= 0 ) {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Please select atleast one PO!!!'
      })
      return
    }
    let poList:any = [];
    this.poTableData.forEach(element => {
      element.po_number
      poList = {'po_number': element.po_number,  'po_status': 'S'}
      this.poSubData.push(poList);
    });
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      supplier_id: this.poSubForm.controls.supplier_id.value, po_headers: this.poSubData
    }
    this.poSubmission.createPOSupplier(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'PO Supplier Saved Successfully!!!'
      })
      this.poTableData.length = 0;
    })
  }

  cancelPo() {
    if(this.poTableData.length <= 0 ) {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Please select atleast one PO!!!'
      })
      return
    }
    let poList:any = [];
    this.poTableData.forEach(element => {
      element.po_number
      poList = {'po_number': element.po_number,  'po_status': 'C'}
      this.poSubData.push(poList);
    });
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      supplier_id: this.poSubForm.controls.supplier_id.value, po_headers: this.poSubData
    }
    this.poSubmission.createPOSupplier(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'PO Cancelled Successfully!!!'
      })
      this.poTableData.length = 0;
    })
  }

  checked(poData: any) {
    if(this.count == 1) {
      for(var i=0; i < this.poTableData.length; i++){
        if(this.poTableData[i].po_number != poData.po_number){
          this.poTableData.push(poData);
          console.log(this.poTableData);
        }else {
          // this.poTableData[i].remove();
          this.poTableData.slice(i)
          console.log('splice',this.poTableData);
        }
      }
    }

    if(this.poTableData.length == 0 && this.count == 0){
      this.poTableData.push(poData);
      this.count++;
    }
  }

}

export interface poItem {
  item_code: string;
  item_desc: string;
  item_cost: string;
  item_name: string;
  net_value: number;
  qty_ordered: number;
  item_status: string;
  exp_del_date: '';
  del_branch_id: '';
  total_cost: number;
  remarks:string;
}
