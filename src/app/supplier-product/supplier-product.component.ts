import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from '../billing/billing.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { SupplierProductService } from './supplier-product.service';

export interface LabItem {
  id?: any;
  product_id?: string;
  product_name: string;
  purchase_price?: number;
  eff_from?: any;
  credit_days?: number;
  check?: any;
  bu_id?: any;
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
  buForm!: FormGroup;

  constructor(private supplierProdSer: SupplierProductService,
    private formBuilder: FormBuilder, private dialog: MatDialog,
    private bs: BillingService,) { }

  ngOnInit(): void {
    this.supplierProduct();
    this.getSupplierId();
    // this.getProductList();
    this.fetchBu();
    this.buForm = this.formBuilder.group({
      bu_id: ['']
    })
  }

  supplierProduct() {
    this.supplierProductForm = this.formBuilder.group(
      {
        branch_id: ['', [Validators.required]],
        supplier_id: ['', Validators.required],
        supplier_name: ['', [Validators.required]]
      }
    );
  }

  addRecord() {
    // this.buForm.controls.bu_id.setValue(this.buForm.value.bu_id);
    this.tableData.push({
      id: this.tableData.length,
      product_id: '',
      product_name: '',
      purchase_price: 0,
      eff_from: '',
      credit_days: 0,
      check: 0,
      bu_id: this.buForm.value.bu_id
    })
  }

  delete_item(item: any) {
    this.tableData.splice(item.id, 1);

  }

  getProductList(id: any) {
    let bu_id = this.buForm.value.bu_id;
    let branch_id = localStorage.getItem('branch_id')
    this.supplierProdSer.getSupplierProdList(bu_id, branch_id).subscribe(data => {
      this.tableData.forEach(element => {
        if(element.id == id){
          this.productList = data.results;
        }
      });
      // console.log("productList", this.productList);
    })
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

  getProductId($event: any){
    for(var i=0; i<this.SupplierProdData.length;i++){
      for(var j=0;j< this.tableData.length;j++){
        if(this.SupplierProdData[i].product_id == this.tableData[j].product_id){
          this.tableData[j].product_name = this.SupplierProdData[i].product_name;
        }
      }
    }
  }

  onChange(id: any){
    this.supplierProductForm.controls.supplier_id.setValue(id);
    let branchId = localStorage.getItem('branch_id');
    let supplierId = id;
    this.supplierProdSer.getSupplierProd(branchId, supplierId).subscribe(data => {
      // console.log("data", data);
      this.SupplierProdData = data.results;
    })
    // this.supplierProduct();
  }

  submit() {
    this.tableData.forEach(element => {
      if(element.check == 0){
        let date = (element.eff_from).split("-");
        element.eff_from = date[2] + '-' + date[1] + '-' + date[0];
        element.check++;
      }
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

  fetchProductsDynamic(id: any) {
    console.log("id", id);
    this.buForm.value.bu_id ? this.getProductList(id) : '';
  }
}