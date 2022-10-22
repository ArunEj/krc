import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  myForm: FormGroup = this.fb.group({
    product_name:[null, { Validators: [Validators.required] }],
    bu_id:[null, { Validators: [Validators.required] }],
    stock_in_hand :[null, { Validators: [Validators.required] }],
    min_stock :[null, { Validators: [Validators.required] }],
    max_stock :[null, { Validators: [Validators.required] }],
    reorder_level :[null, { Validators: [Validators.required] }],
    billing_flag :[null, { Validators: [Validators.required] }],
    product_price :[null, { Validators: [Validators.required] }],
    gst_value :[null, { Validators: [Validators.required] }],
    account_code:[null, { Validators: [Validators.required] }],
    prod_name_invoice :[null, { Validators: [Validators.required] }]
  });
  // productMaster = {
  //   product_name:'',
  //   bu_id:'',
  //   stock_in_hand :0,
  //   min_stock :0,
  //   max_stock :0,
  //   reorder_level :'',
  //   billing_flag :'',
  //   product_price :0,
  //   gst_value :0,
  //   account_code:'',
  //   prod_name_invoice :''
  //   }
  ngOnInit(): void {
  }

}
