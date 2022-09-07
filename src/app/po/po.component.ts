import { Component, OnInit } from '@angular/core';
import { PoService } from './po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {
  poForm!: FormGroup;
  branchList: any;
  supplierIdData: any;
  poList: any;
  poTableData: any[] = [];
  poDraftData: any;
  prodList: any;

 
  constructor(private pos: PoService, private dialog:MatDialog, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBranch();
    this.po();
    this.getSupplierList();
    this.loadBranchData();
  }

  loadBranchData() {
    const id = localStorage.getItem('branch_id');
    this.poForm.controls.branch_id.setValue(id);
    this.getSupplierList();
  }

  po() {
    this.poForm = this.formBuilder.group(
      {
        branch_id: ['', []],
        supplier_id: ['', ],
        supplier_name: ['', []],
        po_number: ['', []],
        po_date: ['', []],
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
    this.pos.getBranchList().subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }

  getSupplierList(){
    const branchId = this.poForm.controls.branch_id.value;
    this.pos.getSupplierList(branchId).subscribe(data => {
      console.log(data);
      this.supplierIdData = data.results;
    })
    branchId? this.getProductList() : '';
  }

  getSupplierPo(){
    const branchId = this.poForm.controls.branch_id.value;
    const supplierId = this.poForm.controls.supplier_id.value; 
    this.pos.getSupplierListByPo(branchId, supplierId).subscribe(data => {
      console.log("PO", data);
      this.poList = data.results;
    })
  }

  getPo(){
    const poNumber = 'POKRC0001000013';
    this.pos.getPoList(poNumber).subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }

  setPoData() {
    const num = this.poForm.controls.po_number.value;
    const poData = this.poList.find((element: any) => element.po_number == num); 
    this.poForm.controls.po_status.setValue(poData.po_status);
    this.poForm.controls.goods_rcpt_status.setValue(poData.goods_rcpt_status);
    this.getPoList()
  }

  getPoList(){
    const branchId = this.poForm.controls.branch_id.value;
    const supplierId = this.poForm.controls.supplier_id.value;
    const poStatus = 'D';
    this.pos.getPoDraftData(branchId, supplierId, poStatus).subscribe(data => {
      console.log(data);
      this.poDraftData = data.results;
    })
  }

  //Set Supplier Name
  onChangeSupplier() {
    const name = this.poForm.controls.supplier_name.value;
    const suppData = this.supplierIdData.find((element: any) => element.supplier_name == name); 
    this.poForm.controls.supplier_id.setValue(suppData.supplier_id);
  }

  addToList() {
    const temp = {item_code:'', item_cost:'', qty_ordered:1, item_name:'', net_value:0, item_status:'D', 
                  remarks:'', del_branch_id:'', exp_del_date:'', item_desc: ''}
    temp.item_code = '';
    temp.item_cost = '';
    temp.qty_ordered = 1;
    temp.net_value = 0;
    temp.item_name = '';
    temp.exp_del_date = '';
    temp.del_branch_id = '';
    temp.item_desc = '';
    temp.remarks = ''
    
    //set values
    temp.item_code = this.poForm.controls.item_code.value; 
    temp.item_desc = this.poForm.controls.item_desc.value; 
    temp.item_cost = this.poForm.controls.item_cost.value;
    temp.qty_ordered = this.poForm.controls.qty_ordered.value;
    temp.net_value = this.poForm.controls.net_value.value;
    // temp.item_name = this.poForm.controls.qty_order.value;
    temp.exp_del_date = this.poForm.controls.exp_del_date.value;
    temp.del_branch_id = this.poForm.controls.del_branch_id.value;
    temp.remarks = this.poForm.controls.remarks.value;

    this.poTableData.push(temp);
    console.log("poTableData", this.poTableData)
    
    this.clearFields();
  }

  clearFields() {  
    this.poForm.controls.item_code.setValue(null);
    this.poForm.controls.item_desc.setValue(null);
    this.poForm.controls.item_cost.setValue(null); 
    this.poForm.controls.qty_ordered.setValue(null); 
    this.poForm.controls.net_value.setValue(null); 
    this.poForm.controls.qty_order.setValue(null);   
    this.poForm.controls.exp_del_date.setValue(null); 
    this.poForm.controls.del_branch_id.setValue(null); 
    this.poForm.controls.remarks.setValue(null);
  }

  getProductList() {
    let branch_id = localStorage.getItem('branch_id')
    this.pos.getProdList(branch_id).subscribe(data => {
          this.prodList = data.results;
    })
  }

  setItemCode() {
    const desc = this.poForm.controls.item_desc.value;
    const item = this.prodList.find((element:any) => element.product_name == desc);
    this.poForm.controls.item_code.setValue(item.product_id);
  }

  submit() {
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      po_status:"D", goods_rcpt_status:"P", po_details: this.poTableData
    }
    this.pos.createPO(params).subscribe(data => {
      console.log(data);
    })
  }

  calculateTotalCost() {
    const cost = this.poForm.controls.item_cost.value;
    const qty = this.poForm.controls.qty_ordered.value;
    if(cost && qty){
      this.poForm.controls.net_value.setValue(cost * qty);
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
  // exp_del_date:string;
  // del_branch_id:string;
  exp_del_date: '';
  del_branch_id: '';
  total_cost: number;
  remarks:string;
}
