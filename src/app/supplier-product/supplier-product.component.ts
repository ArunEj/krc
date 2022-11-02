import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from '../billing/billing.service';
import { EodService } from '../eod/eod.service';
import { PoService } from '../po/po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { SupplierProductService } from './supplier-product.service';

export interface LabItem {
  id?: any;
  product_id?: string;
  product_name: string;
  purchase_price?: number;
  eff_from?: any;
  credit_days?: number;
  bu_id?: any;
  active_flag?: string
  // check?: number;
}

@Component({
  selector: 'app-supplier-product',
  templateUrl: './supplier-product.component.html',
  styleUrls: ['./supplier-product.component.scss']
})
export class SupplierProductComponent implements OnInit {
  
  supplierProductForm!: FormGroup;
  fetchSupplierProductdata: any;
  tableData: LabItem[] = [];
  supplierIdData: any;
  SupplierProdData: any;
  getSuppProds: any;
  productList: any;
  buList: any;
  prodItem = {
    product_id: '',
    product_name: '',
    purchase_price: 0,
    eff_from: '',
    credit_days: 0,
    active_flag: ''
    // check: 0
  }
  branchList: any;
  eodDate: any;
  // buForm!: FormGroup;

  constructor(private supplierProdSer: SupplierProductService,
    private formBuilder: FormBuilder, private dialog: MatDialog,
    private bs: BillingService, private pos: PoService, private eodService: EodService) { }

  ngOnInit(): void {
    this.supplierProduct();
    this.getSupplierId();
    // this.getProductList();
    this.fetchBu();
    this.getBranch();
    this.loadBranchData();
    this.getEodDetails();
  }

  loadBranchData() {
    const id = localStorage.getItem('branch_id');
    this.supplierProductForm.controls.branch_id.setValue(id);
  }

  supplierProduct() {
    this.supplierProductForm = this.formBuilder.group(
      {
        branch_id: ['', [Validators.required]],
        supplier_id: ['', Validators.required],
        supplier_name: ['', [Validators.required]],
        bu_id: ['', []],
        product_id: ['', [Validators.required]],
        product_name: ['', [Validators.required]],
        purchase_price: ['', []],
        eff_from: ['', [Validators.required]],
        credit_days: ['', []]
      }
    );
  }

  addRecord() {
    if(this.supplierProductForm.valid){
      this.tableData.push(this.prodItem);
      this.resetData();
    }
    // this.buForm.controls.bu_id.setValue(this.buForm.value.bu_id);
    // this.tableData.push({
    //   id: this.tableData.length,
    //   product_id: '',
    //   product_name: '',
    //   purchase_price: 0,
    //   eff_from: '',
    //   credit_days: 0,
    //   check: 0,
    //   bu_id: this.supplierProductForm.value.bu_id
    // })
  }

  resetData() {
    this.prodItem = {
      product_id: '',
      product_name: '',
      purchase_price: 0,
      eff_from: '',
      credit_days: 0,
      active_flag: ''
      // check: 0
    }
    this.supplierProductForm
  }

  delete_item(item: any) {
    this.tableData.splice(item.id, 1);

  }

  //Get EOD
  getEodDetails() {
    let orgId = localStorage.getItem('org_id')
    let branch_id = localStorage.getItem('branch_id')
    this.eodService.getEodDetailData(orgId, branch_id).subscribe(data => {
      console.log("EOD data", data.results);
      this.eodDate = data.results[0].eod_date;
    })
  }

  getProductList(id: any) {
    let bu_id = this.supplierProductForm.value.bu_id;
    let branch_id = localStorage.getItem('branch_id');
    this.supplierProdSer.getSupplierProdList(bu_id, branch_id, this.eodDate).subscribe(data => {
      // this.tableData.forEach(element => {
      //   if(element.id == id){
          this.productList = data.results;
      //   }
      // });
      console.log("productList", this.productList);
    },
    (err) => {
      this.productList = null;
      // console.log(err)
    });
  }

  getSupplierId() {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id')
    this.supplierProdSer.getSupplierIdList(org_id, branch_id).subscribe(data => {
      this.supplierIdData = data.results;
      // this.fetchSupplierProductdata = data.results;
      // console.log("data", this.supplierIdData);

    })
  }

  setProductId($event: any){
    console.log("event", $event);
    if($event !== ''){
      this.productList.forEach((element: any) => {
        if(element.product_name == $event){
          this.supplierProductForm.controls.product_id.setValue(element.product_id);
        }
      });
    }
    // for(var i=0; i<this.SupplierProdData.length;i++){
    //   for(var j=0;j< this.tableData.length;j++){
    //     if(this.SupplierProdData[i].product_id == this.tableData[j].product_id){
    //       this.tableData[j].product_name = this.SupplierProdData[i].product_name;
    //     }
    //   }
    // }
  }

  onChange(id: any){
    this.supplierProductForm.controls.supplier_id.setValue(id);
    let branchId = localStorage.getItem('branch_id');
    let supplierId = id;
    this.supplierProdSer.getSupplierProd(branchId, supplierId).subscribe(data => {
      console.log("data", data);
      this.SupplierProdData = data.results;
    })
    // this.supplierProduct();
  }

  submit() {
    this.addRecord();
    this.tableData.forEach(element => {
      element.active_flag = 'Y';
      // if(element.check == 0){
      //   let date = (element.eff_from).split("-");
      //   element.eff_from = date[2] + '-' + date[1] + '-' + date[0];
      //   element.check++;
      // }
    });
    console.log("tableDate submit", this.tableData);
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      supplier_id: this.supplierProductForm.controls.supplier_id.value, supp_prods: this.tableData
    }
    this.supplierProdSer.createSupplierProd(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Product Saved Successfully!!!'
      })
      this.onChange(data.supplier_id);
    })
    this.tableData = [];
  }

  //Get BU ID
  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
    })
  }

  fetchProductsDynamic() {
    this.supplierProductForm.value.bu_id ? this.getProductList(this.supplierProductForm.value.bu_id) : '';
  }

  //getBranch
  getBranch(){
    this.pos.getBranchList().subscribe(data => {
      console.log(data);
      this.branchList = data.results;
    })
  }
}
