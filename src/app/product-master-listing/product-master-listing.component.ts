import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferenceService } from '../utilities/services/reference.service';
import { PMTableComponent } from './pr-table/pr-table.component';

import { Router } from '@angular/router';
@Component({
  selector: 'app-product-master-listing',
  templateUrl: './product-master-listing.component.html',
  styleUrls: ['./product-master-listing.component.scss']
})
export class ProductMasterListingComponent implements OnInit {

  bu: any = [];
  prodList: any = [];
  showNpForm = false;
  showipForm = false;
  myForm: FormGroup = this.fb.group({
    bu_id: [null, { Validators: [Validators.required] }],
  });
  constructor(private ref: ReferenceService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchBu();
    if (history.state.id) {
      this.myForm.get('bu_id')?.setValue(history.state.id);
      this.getProducts();
    }
  }


  fetchBu() {
    this.ref.fetchBuList().subscribe(data => {
      this.bu = data.results;
    })
  }

  getProducts() {
    this.prodList = [];
    let bu = this.myForm.get('bu_id')?.value;
    this.ref.fetchProducts(bu).subscribe(data => {
      this.prodList = data.results;
    })
  }

  update(item: any) {
    // this.updateprService.inputPayload.from_date = this.from_date;
    // this.updateprService.inputPayload.to_date = this.to_date;
    // this.updateprService.inputPayload.type = this.trans_type;
    // this.updateprService.reportData = this.reportData;
    this.router.navigate(['/product-master'], { state: item });
  }
  /*{"org_id":"KRC","branch_id":"KRC0001","product_id":"PRD000000",
  "product_name":"Shan test","uom":null,"bu_id":"DIALY","stock_in_hand":null
  "min_stock":null,"max_stock":null,"reorder_level":null,"price_deviation":null,"billing_flag":"Y",
  "account_code":null,"updated_by":"KRC0010002","updated_date":"2022-10-24T00:00:00.000Z",
  "created_by":"KRC0010002","created_date":"2022-10-24T00:00:00.000Z","product_price":1000,
  "prod_name_invoice":null,"gst_value":null}*/

  product: any;


  emitPricing(element: any) {
    this.product = element;
    (element.np)?this.showNpForm = true:this.showipForm = true;    
  }

  


  reload() {
    this.getProducts();
    this.showNpForm = false;
    this.showipForm = false;

  }
}
