import { Component, OnInit } from '@angular/core';
import { PoService } from './po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
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
  grandTotal: any = 0;
  isShowEdit: boolean = true;
  updateData: any;

 
  constructor(private pos: PoService, private dialog:MatDialog, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBranch();
    this.po();
    // this.getSupplierList();
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
        branch_id: [null, []],
        supplier_id: [null, ],
        supplier_name: [null, []],
        po_number: [null, []],
        po_date: [null, []],
        po_value: [null, []],
        supInvVal: [null, []],
        paidSup: [null, []],
        balSup: [null, []],
        po_status: [null, []],
        goods_rcpt_status: [null],
        item_code: [null],
        item_desc: [null],
        item_cost: [null],
        qty_ordered: [null],
        net_value: [null],
        exp_del_date: [null],
        del_branch_id: [null],
        remarks: [null],
        id: [null]
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
    const orgId = localStorage.getItem('org_id')
    this.pos.getSupplierList(branchId).subscribe(data => {
      console.log(data);
      this.supplierIdData = data.results;
    })
    // branchId? this.getProductList() : '';
  }

  getSupplierPo(){
    const branchId = this.poForm.controls.branch_id.value;
    const supplierId = this.poForm.controls.supplier_id.value; 
    this.pos.getSupplierListByPo(branchId, supplierId).subscribe(data => {
      console.log("PO", data);
      // this.poList = data.results;
      this.poTableData = data.results;

    })
  }

  getPo(num: any){
    this.pos.getPoList(num).subscribe(data => {
      console.log("po number", data);
      // this.branchList = data.results;
      this.poForm.controls.po_date.setValue(data.po_date);
      this.poForm.controls.po_value.setValue(data.po_value);
      this.poForm.controls.po_status.setValue(data.po_status_name);
      this.poForm.controls.goods_rcpt_status.setValue(data.goods_rcpt_status_name);
    })
  }

  setPoData() {
    const num = this.poForm.controls.po_number.value;
    const poData = this.poDraftData.find((element: any) => element.po_number == num);
    this.poTableData = poData.po_details;
    this.poForm.controls.po_date.setValue(poData.po_date);
    this.poForm.controls.po_value.setValue(poData.po_value);
    this.getPo(num);
  }

  getPoList(){
    const branchId = this.poForm.controls.branch_id.value;
    const supplierId = this.poForm.controls.supplier_id.value;
    const poStatus = 'D';
    this.pos.getPoDraftData(branchId, supplierId, poStatus).subscribe(data => {
      console.log(data);
      this.poDraftData = data.results;
    },(err) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message
        })
      })
  }

  //Set Supplier Name
  onChangeSupplier() {
    this.poForm.controls.po_number.setValue(null);
    this.poForm.controls.po_status.setValue('Draft');
    this.poForm.controls.goods_rcpt_status.setValue('Partially Paid');
    const name = this.poForm.controls.supplier_name.value;
    const suppData = this.supplierIdData.find((element: any) => element.supplier_name == name); 
    this.poForm.controls.supplier_id.setValue(suppData.supplier_id);
    this.getProductList();
    // this.poDraftData ? this.poDraftData.length = null : '';
  }

  addToList() {
    const temp = {item_code:'', item_cost:'', qty_ordered:1, net_value:0, item_status:'P', 
                  remarks:'', del_branch_id:'',del_branch_name: '', exp_del_date:'', item_desc: '', product_name: '', id: 0}
    temp.item_code = '';
    temp.item_cost = '';
    temp.qty_ordered = 1;
    temp.net_value = 0;
    temp.exp_del_date = '';
    temp.del_branch_id = '';
    temp.del_branch_name = '';
    temp.item_desc = '';
    temp.product_name = '';
    temp.remarks = '';
    temp.id = 0;
    
    //set values
    temp.item_code = this.poForm.controls.item_code.value; 
    // temp.item_desc = this.poForm.controls.item_desc.value; 
    temp.item_cost = this.poForm.controls.item_cost.value;
    temp.qty_ordered = this.poForm.controls.qty_ordered.value;
    // temp.net_value = this.poForm.controls.net_value.value;
    temp.net_value = 0;
    temp.exp_del_date = this.poForm.controls.exp_del_date.value;
    temp.del_branch_id = this.poForm.controls.del_branch_id.value;
    temp.remarks = this.poForm.controls.remarks.value;
    temp.id = this.poTableData.length;
    let getItem = this.prodList.find((element: any)=> element.product_id == temp.item_code);
    temp.product_name = getItem.product_name;
    let getBranch = this.branchList.find((element: any)=> element.branch_id == temp.del_branch_id);
    temp.del_branch_name = getBranch.branch_name
    this.grandTotal = this.grandTotal + temp.net_value;
    this.poForm.controls.po_value.setValue(this.grandTotal);
    this.poTableData.push(temp);
    
    this.clearFields();
  }

  clearFields() {  
    this.poForm.controls.item_code.setValue(null);
    this.poForm.controls.item_desc.setValue(null);
    this.poForm.controls.item_cost.setValue(null); 
    this.poForm.controls.qty_ordered.setValue(null); 
    this.poForm.controls.net_value.setValue(null);  
    this.poForm.controls.exp_del_date.setValue(null); 
    this.poForm.controls.del_branch_id.setValue(null); 
    this.poForm.controls.remarks.setValue(null);
  }

  getProductList() {
    let supId = this.poForm.controls.supplier_id.value;
    this.pos.getProducts(supId).subscribe(data => {
            this.prodList = data.results;
      })
  }

  setItemCode() {
    const desc = this.poForm.controls.item_desc.value;
    const item = this.prodList.find((element:any) => element.product_name == desc);
    this.poForm.controls.item_code.setValue(item.product_id);
    this.poForm.controls.item_cost.setValue(item.purchase_price);
    this.calculateTotalCost()
  }

  submit() {
    let form = this.poForm.controls;
    if(form.item_desc.value && form.item_code.value && form.net_value.value && form.item_cost.value && form.qty_ordered.value && form.del_branch_id.value){
      this.addToList();
    }
    // this.isShowEdit ? this.poTableData : this.poTableData = this.poList;
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      supplier_id: this.poForm.controls.supplier_id.value, po_status:"D", goods_rcpt_status:"P", po_details: this.poTableData
    }
    this.pos.createPO(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'PO Saved Successfully!!!'
      })
      this.poTableData.length = 0;
    })
  }

  calculateTotalCost() {
    const cost = this.poForm.controls.item_cost.value;
    const qty = this.poForm.controls.qty_ordered.value;
    if(cost && qty){
      this.poForm.controls.net_value.setValue(cost * qty);
    }
  }

  edit(item: any) {
    console.log(item)
    this.updateData = item;
    this.isShowEdit = false;
    this.poForm.controls.item_desc.setValue(item.product_name);
    this.poForm.controls.item_code.setValue(item.item_code);
    this.poForm.controls.item_cost.setValue(item.item_cost);
    this.poForm.controls.qty_ordered.setValue(item.qty_ordered);
    this.poForm.controls.net_value.setValue(item.net_value);
    this.poForm.controls.del_branch_id.setValue(item.del_branch_id);
    this.poForm.controls.exp_del_date.setValue(item.exp_del_date);
    this.poForm.controls.remarks.setValue(item.remarks);
  }

  editList() {
    let getValue = this.poTableData.find((element:any)=> element.item_code == this.updateData.item_code);
    this.poTableData.forEach((element:any) => {
      if(element.item_code == getValue.item_code){
          //set values
          element.item_code = this.poForm.controls.item_code.value;
          element.item_cost = this.poForm.controls.item_cost.value;
          element.qty_ordered = this.poForm.controls.qty_ordered.value;
          element.net_value = this.poForm.controls.net_value.value;
          element.exp_del_date = this.poForm.controls.exp_del_date.value;
          element.del_branch_id = this.poForm.controls.del_branch_id.value;
          element.remarks = this.poForm.controls.remarks.value;
          let getItem = this.prodList.find((prod: any)=> prod.product_id == element.item_code);
          element.product_name = getItem.product_name;
          let getBranch = this.branchList.find((prod: any)=> prod.branch_id == element.del_branch_id);
          element.del_branch_name = getBranch.branch_name;
          this.grandTotal = this.grandTotal + element.net_value;
          this.poForm.controls.po_value.setValue(this.grandTotal);
        }
        
      });
      this.clearFields();
      this.isShowEdit = true;
  }

  delete(item: any) {
    let dataArray = this.poTableData;
    
    this.poTableData.forEach(element => {
      if(element.id == item.id) {
        dataArray.splice(element.id, 1);
      }
    });

    this.poTableData = dataArray;

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
  del_branch_name: '';
  total_cost: number;
  product_name: string;
  remarks:string;
  id: number;
}
