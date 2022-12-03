import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoodsReceiptService } from './goods-receipt.service';
import Swal from 'sweetalert2';
declare var $:any

@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.scss']
})
export class GoodsReceiptComponent implements OnInit {
  goodsForm!: FormGroup;
  branchList: any;
  supplierIdData: any;
  poList: any;
  poTableData: any[] = [];
  poDraftData: any;
  prodList: any;
  grandTotal: any;
  poSubData: any[] = [];
  poData: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  prodName: any;
  @ViewChild('focus', {static: false}) input: ElementRef | any;

  constructor(private goodsService: GoodsReceiptService, private dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBranch();
    this.goods();
    this.loadBranchData();
  }

  loadBranchData() {
    const id = localStorage.getItem('branch_id');
    this.goodsForm.controls.branch_id.setValue(id);
    this.getSupplierList();
  }

  goods() {
    this.goodsForm = this.formBuilder.group(
      {
        branch_id: ['', []],
        supplier_id: ['',],
        supplier_name: ['', []],
        gr_qty_received: ['', []],
        supp_inv_date: ['', []],
        receipt_date: ['', []]
      }
    );
  }

  getBranch() {
    this.goodsService.getBranchList().subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }

  setPoData(poValue: any) {
    const num = poValue;
    this.poData = this.poDraftData.find((element: any) => element.po_number == num);
    console.log("poData", this.poData)
    this.poList = this.poData.po_details;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.input.nativeElement.focus();
    },0);
    // this.getPoList()
    this.getPo(num);
  }

  getPo(num: any) {
    this.goodsService.getPoList(num).subscribe(data => {
      console.log("po number", data);
    })
  }

  getSupplierList() {
    const branchId = this.goodsForm.controls.branch_id.value;
    this.goodsService.getSupplierList(branchId).subscribe(data => {
      console.log(data);
      this.supplierIdData = data.results;
    })
  }

  getPoList() {
    const branchId = this.goodsForm.controls.branch_id.value;
    const supplierId = this.goodsForm.controls.supplier_id.value;
    const poStatus = 'S';
    this.goodsService.getPoDraftData(branchId, supplierId, poStatus).subscribe(data => {
      console.log("po list", data);
      this.poDraftData = data.results;
    })
  }

  //Set Supplier Name
  onChangeSupplier() {
    this.poList = null;
    this.poDraftData = null;
    const name = this.goodsForm.controls.supplier_name.value;
    const suppData = this.supplierIdData.find((element: any) => element.supplier_name == name);
    this.goodsForm.controls.supplier_id.setValue(suppData.supplier_id);
    this.getPoList();
  }

  validateQty(range: any) {
    if (range.gr_qty_received && range.qty_balance && (range.gr_qty_received > range.qty_balance)) {
      this.goodsForm.controls.gr_qty_received.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Inv Qty should not be Greater than Qty Balance So far!'
      })
    } else {
      this.goodsForm.controls.gr_qty_received.setErrors(null);
    }
  }

  validateInvDate(range: any) {
    const suppDate = new Date(range.supp_inv_date);
    const todayDate = new Date().getTime();
    const oldDate = suppDate.getTime();
    console.log(todayDate < oldDate)
    if (range.supp_inv_date && range.po_date && (range.supp_inv_date < range.po_date)) {
      this.goodsForm.controls.supp_inv_date.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Inv Date should not be Lesser than PO Date!'
      })
    } else {
      this.goodsForm.controls.supp_inv_date.setErrors(null);
    }
    if ((todayDate < oldDate)) {
      this.goodsForm.controls.supp_inv_date.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Inv Date should not be Future Date!'
      })
    } else {
      this.goodsForm.controls.supp_inv_date.setErrors(null);
    }
  }

  validateReceiptDate(range: any) {
    const suppDate = new Date(range.receipt_date);
    const todayDate = new Date().getTime();
    const oldDate = suppDate.getTime();
    if (range.receipt_date && range.po_date && (range.receipt_date < range.supp_inv_date)) {
      this.goodsForm.controls.receipt_date.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Receipt Date should not be Lesser than Inv Date!'
      })
    } else {
      this.goodsForm.controls.receipt_date.setErrors(null);
    }
    if ((todayDate < oldDate)) {
      this.goodsForm.controls.receipt_date.setErrors({ 'incorrect': true });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Receipt Date should not be Future Date!'
      })
    } else {
      this.goodsForm.controls.receipt_date.setErrors(null);
    }
  }


  saveGoods() {
    console.log(this.poList);
    let poData: any[] = [];
    if (this.goodsForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter Valid Data!'
      })
      return
    }
    this.poList.forEach((element: any) => {
      if(element.item_status !== 'F' && element.supp_inv_number && element.supp_inv_date && element.receipt_date &&
          element.gr_qty_received && element.gr_supp_inv_amt){
            poData.push(element);
            console.log(poData);
        }
    });

    if(poData.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter Inv#/ Inv Date/ Received date/ Inv Qty/ Inv Amount for atleast one row'
      })
      return
    }

    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      supplier_id: this.goodsForm.controls.supplier_id.value, po_number: this.poData.po_number, po_date: this.poData.po_date, po_goods: poData
    }
    this.goodsService.createGoods(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Goods Receipt Saved Successfully!!!'
      })
      this.poList = null;
    })
  }

  view(poData: any) {
    console.log(poData)
    this.prodName = poData.product_name;
    let supp_id = poData.supplier_id;
    let poNumber = poData.po_number;
    let code = poData.item_code;
    this.goodsService.viewGoods(supp_id, poNumber, code).subscribe(data => {
      console.log(data.results);
      this.dataSource = data.results;
      $("#MyPopup").modal("show");
    })
  }

  close() {
    $("#MyPopup").modal("hide");
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
  remarks: string;
  supp_inv_number: string;
  receipt_date: string;
  supp_inv_date: string;
  gr_qty_received: number;
  gr_supp_inv_amt: number;
}