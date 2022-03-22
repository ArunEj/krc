import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BillingService } from './billing.service';
import { BillingItem, billingProduct } from './billing.model';
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {


  registerForm: FormGroup = this.fb.group({
    product_cost: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }]
  });

  myForm: FormGroup = this.fb.group({
    product_type: [, {
      validators: [Validators.required],
      updateOn: "change"
    }],
    // product_name: [, {
    //   validators: [Validators.required],
    //   updateOn: "change"
    // }],
    product_cost: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }],
    product_bill_qty: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }],
    charge1: [],
    charge2: [],
    charge3: [],
    gross_inv_amount: [],
    cgremark1: [],
    cgremark2: [],
    cgremark3: [],
    dsremark1: [],
    dsremark2: [],
    dsremark3: [],
    dscount1: [],
    dscount2: [],
    dscount3: [],
    totaldiscount: [],
    netamount: []

  });

  patientDetail = false;
  patientHeader:any;
  mobile_no: string = '';
  billingArray: any = [];
  showModal = false;
  finalPay: number = 0;
  showBillingForm = false;
  myControl = new FormControl();
  options: any = [];
  dialysisProducts: BillingItem[] = [];
  labProducts: BillingItem[] = [];
  pharmacyProducts: BillingItem[] = [];
  billingItem = {
    branch_id: localStorage.getItem('branch_id'),
    patient_id:'',
    product_id: '',
    product_type: '',
    product_cost: Number(0),
    product_name: '',
    product_bill_qty: Number(0),
    product_total_value: Number(0),
    charge1: Number(0),
    charge2: Number(0),
    charge3: Number(0),
    cgremark1: '',
    cgremark2: '',
    cgremark3: '',
    gross_inv_amount: Number(0),
    dscount1: Number(0),
    dscount2: Number(0),
    dscount3: Number(0),
    dsremark1: '',
    dsremark2: '',
    dsremark3: '',
    totaldiscount: Number(0),
    netamount: Number(0),
    netbalance: Number(0),
    netpaid: Number(0),
    updated_by: localStorage.getItem('user_id')
  }
  dialysisProductsNameList: string[] = [];
  labProductNameList: string[] = [];
  pharmacyProductNameList: string[] = [];
  filteredOptions: Observable<any[]> | undefined;
  constructor(private bs: BillingService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.fetchProductBasedonType();
    this.fetchPharmacyProducts();
    this.fetchLabProducts();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );



  }


  fetchUser() {
    this.bs.fetchUserData(this.mobile_no).subscribe(data => {
      this.patientDetail = true;
      this.patientHeader = data;
      console.log(data);
    })
  }

  fetchProductBasedonType() {
    this.bs.fetchProductMaster("DIALYSIS").subscribe(data => {
      this.dialysisProducts = data;
      this.dialysisProducts.filter(item => {
        this.dialysisProductsNameList.push(item.product_name);
      });
    });
  }

  fetchPharmacyProducts() {
    this.bs.fetchProductMaster("PHARMACY").subscribe(data => {
      this.pharmacyProducts = data;
      this.pharmacyProducts.filter(item => {
        this.pharmacyProductNameList.push(item.product_name);
      });
    });
  }
  fetchLabProducts() {
    this.bs.fetchProductMaster("LAB").subscribe(data => {
      this.labProducts = data;
      this.labProducts.filter(item => {
        this.labProductNameList.push(item.product_name);
      });
    });
  }

  setProductCost(data: any) {
    this.billingItem.product_cost = parseInt(data.value.selling_price);
    this.calclulateOthercharges(this.billingItem.product_cost);
  }
  displayProperty(value: any) {
    if (value) {
      //this.billingItem.amount = value.selling_price;
      return value.product_name;
    }
  }

  fetchProduct(data: any) {

    this.options = [];
    switch (data?.value) {
      case 'DIALYSIS': {
        this.options = this.dialysisProducts;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );

        break;
      }
      case 'PHARMACY': {
        this.options = this.pharmacyProducts;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );

        break;
      }
      case 'LAB': {
        this.options = this.labProducts;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
        break;
      }
      default: {

      }

    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: { product_name: string; }) => option.product_name.toLowerCase().includes(filterValue));
  }

  cancelNewItem() {
    this.resetFields();
    this.showBillingForm = false;
  }
  addItem() {
    this.billingItem.patient_id = this.patientHeader.patient_id;
    this.billingArray.push(this.billingItem);
    this.showBillingForm = false;
    this.options = [];
    this.calculateFinal();
    this.resetFields();
  }

  calculateAmountPerQty(data: number) {
    this.billingItem.product_total_value = (this.billingItem.product_bill_qty * this.billingItem.product_cost);
    this.calclulateOthercharges(data);
  }

  calclulateOthercharges(data: number) {
    this.billingItem.gross_inv_amount = (this.billingItem.product_bill_qty * this.billingItem.product_cost) + this.billingItem.charge1 + this.billingItem.charge2 + this.billingItem.charge3;
    this.calclulateNetPay();
    //this.billingItem.gross = 4+5;
  }
  calclulateDiscount(data: number) {
    this.billingItem.totaldiscount = this.billingItem.dscount1 + this.billingItem.dscount2 + this.billingItem.dscount3;
    this.calclulateNetPay();
  }

  calclulateNetPay() {
    this.billingItem.netamount = (this.billingItem.gross_inv_amount) - this.billingItem.totaldiscount;
    //this.calculateFinal();
  }

  calculateFinal() {
    this.finalPay = this.finalPay + this.billingItem.netamount;
    localStorage.setItem('billingarray', JSON.stringify(this.billingArray));

  }

  // redirectPayment(){
  //   this.bs.currentBillingArray = this.billingArray;
  //   this.router.navigate(['/payment']);
  // }

  submitData() {
    this.bs.submitInvoice(this.billingArray).subscribe(data => {
      console.log(data);
      this.bs.invoice_no = data.invoice_no;
      this.bs.patient_id = this.patientHeader.patient_id;
      this.router.navigate(['invoice']);
    })

   // this.router.navigate(['/payment']);
  }

  resetFields() {
    this.billingItem = {
      patient_id:'',
      branch_id: localStorage.getItem('branch_id'),
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      product_name: '',
      product_bill_qty: Number(0),
      product_total_value: Number(0),
      charge1: Number(0),
      charge2: Number(0),
      charge3: Number(0),
      cgremark1: '',
      cgremark2: '',
      cgremark3: '',
      gross_inv_amount: Number(0),
      dscount1: Number(0),
      dscount2: Number(0),
      dscount3: Number(0),
      dsremark1: '',
      dsremark2: '',
      dsremark3: '',
      totaldiscount: Number(0),
      netamount: Number(0),
      netbalance: Number(0),
      netpaid: Number(0),
      updated_by: localStorage.getItem('user_id')
    }
  }

}
function MdAutocompleteTrigger(MdAutocompleteTrigger: any) {
  throw new Error('Function not implemented.');
}

