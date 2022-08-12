import { Component, OnInit } from '@angular/core';
import { PoService } from './po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {
  branch_id = localStorage.getItem('branch_id');
  //poItem = { item_code: '', item_name: '', item_cost: '', net_value: 0, qty_ordered: 1, item_status: '' }
  selectedProduct: Product = { product_id: '', product_name: '', purchase_price: '' };
  productName = '';
  supId: string = '';
  price: string = '';
  cost: number = 0;
  qty: number = 1;
  showForm = false;
  poList: poItem[] = [];

  productList: Product[] = [];
  constructor(private pos: PoService, private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
  }

  getSupplierProducts() {
    this.pos.getProducts(this.supId).subscribe(data => {
      this.productList = data.results;
    })
  }


  showPOForm() {
    this.showForm = true;
    // this.poItem.item_cost = this.price;
    // this.poItem.net_value = this.cost;
    // this.poItem.qty_ordered = this.qty;
    // this.poItem.item_code = this.selectProduct.item_code

  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.price = product.purchase_price;
    this.setCost(1);
    console.log(product);
  }
  setCost(qty: any) {
    this.cost = qty * parseInt(this.price);
  }
  clearFields() {    
    this.price = '';
    this.qty = 1;
    this.cost = 0;
    this.productName = '';
  }


  addToList() {
    const temp = {item_code:'', item_cost:'', qty_ordered:1, item_name:'', net_value:0, item_status:'D'}
    temp.item_code = '';
    temp.item_cost = '';
    temp.qty_ordered = 1;
    temp.net_value = 0;
    temp.item_name = '';
    
    //set values
    temp.item_code = this.selectedProduct.product_id;  
    temp.item_cost = this.price;
    temp.qty_ordered = this.qty;
    temp.net_value = this.cost;
    temp.item_name = this.selectedProduct.product_name;

    this.poList.push(temp);
    
    this.clearFields();
    this.showForm = false;
  }

  createPo() {
    let poPayload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id":localStorage.getItem('branch_id'),
      "supplier_id": this.supId,
      "po_status": "D",
      "goods_rcpt_status": "P",
      "user_id": localStorage.getItem('user_id'),
      "po_details": this.poList
    }
    this.pos.createPO(poPayload).subscribe(data=>{
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'PO Created Successfully'
      })
      this.poList = [];
      // this.router.navigate(['landing']);
    }, error=>{
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'PO Creation Error'
      })
    })


    
  }

}

export interface Product {
  product_name: string;
  purchase_price: string;
  product_id: string

}

export interface poItem {
  item_code: string;
  item_cost: string;
  item_name: string;
  net_value: number;
  qty_ordered: number;
  item_status: string;
}
