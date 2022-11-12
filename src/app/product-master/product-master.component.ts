import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferenceService } from '../utilities/services/reference.service';
import { ProductMasterService } from './product-master.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';



@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  constructor(private fb: FormBuilder, private ref: ReferenceService,
    private dialog: MatDialog, private pms: ProductMasterService, private router: Router) { }
  bu: any[] = [];
  prdTypes:any = [];

  myForm: FormGroup = this.fb.group({
    product_name: [null, { Validators: [Validators.required] }],
    uom: [null, { Validators: [Validators.required] }],
    bu_id: [null, { Validators: [Validators.required] }],
    stock_in_hand: [0, { Validators: [Validators.required] }],
    min_stock: [0, { Validators: [Validators.required] }],
    max_stock: [0, { Validators: [Validators.required] }],
    reorder_level: [null, { Validators: [Validators.required] }],
    billing_flag: [null, { Validators: [Validators.required] }],
    product_price: [0, { Validators: [Validators.required] }],
    gst_value: [0, { Validators: [Validators.required] }],
    account_code: [null, { Validators: [Validators.required] }],
    prod_name_invoice: [null, { Validators: [Validators.required] }]
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
    if (history.state.product_id) {
      this.setValues();
    }
    this.fetchBu();
    this.fetchPRD();
  }

  setValues() {
    
    this.myForm.get('product_name')?.setValue(history.state.product_name);
    this.myForm.get('uom')?.setValue(history.state.uom);
    this.myForm.get('bu_id')?.setValue(history.state.bu_id);

    this.myForm.get('min_stock')?.setValue(history.state.min_stock);
    this.myForm.get('stock_in_hand')?.setValue(history.state.stock_in_hand);
    this.myForm.get('max_stock')?.setValue(history.state.max_stock);

    this.myForm.get('reorder_level')?.setValue(history.state.reorder_level);
    this.myForm.get('price_deviation')?.setValue(history.state.price_deviation);
    this.myForm.get('billing_flag')?.setValue(history.state.billing_flag);
    this.myForm.get('account_code')?.setValue(history.state.account_code);
    this.myForm.get('product_price')?.setValue(history.state.product_price);
    this.myForm.get('prod_name_invoice')?.setValue(history.state.prod_name_invoice);
    this.myForm.get('gst_value')?.setValue(history.state.gst_value);


  }

  fetchPRD(){
    this.ref.getBillingTypes().subscribe(data=>{
      this.prdTypes = data.results;
    })
  }

  fetchBu() {
    this.ref.fetchBuList().subscribe(data => {
      this.bu = data.results;
    })
  }

  save() {
    let payload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      uom: this.myForm.get('uom')?.value,
      product_name: this.myForm.get('product_name')?.value,
      bu_id: this.myForm.get('bu_id')?.value,
      stock_in_hand: this.myForm.get('stock_in_hand')?.value,
      min_stock: this.myForm.get('min_stock')?.value,
      max_stock: this.myForm.get('max_stock')?.value,
      reorder_level: this.myForm.get('reorder_level')?.value,
      billing_flag: this.myForm.get('billing_flag')?.value,
      product_price: this.myForm.get('product_price')?.value,
      gst_value: this.myForm.get('gst_value')?.value,
      account_code: this.myForm.get('account_code')?.value,
      prod_name_invoice: this.myForm.get('prod_name_invoice')?.value,
      product_id: (history.state.product_id) ? history.state.product_id : ''
    };


    console.log(payload)
    this.pms.createProd(payload).subscribe(data => {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Product Saved Successfully!!!'
      })
      dialogRef.afterClosed().subscribe(data => {
        if (history.state.product_id) {
          this.router.navigate(['product-master-listing'], { state: { id: history.state.bu_id } })
        } else {
          this.router.navigate(['/landing'])
        }

      })
    })

  }

}
