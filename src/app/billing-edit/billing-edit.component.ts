import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BillingService } from './billing-edit.service';
import { BillingItem, Bu } from './billing-edit.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { InvoiceComponent } from '../invoice/invoice.component';
@Component({
  selector: 'app-billing-edit',
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.scss']
})
export class BillingEditComponent implements OnInit {


  registerForm: FormGroup = this.fb.group({
    product_cost: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }]
  });

  myForm: FormGroup = this.fb.group({
    bu_id: [, {
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
    product_qty: [, {
      validators: [Validators.required, Validators.min(1)],
      updateOn: "change"
    }],
    other_charge1: [],
    other_charge2: [],
    other_charge3: [],
    gross_inv_amount: [],
    other_charge_remark1: [],
    other_charge_remark2: [],
    other_charge_remark3: [],
    discount_remark1: [],
    discount_remark2: [],
    discount_remark3: [],
    discount1: [],
    dscount2: [],
    discount3: [],
    total_discount: [],
    net_amount: []

  });
  showItemDetails = false;
  buList: Bu[] = [];
  patientDetail = false;
  headerDetail = false;
  patientHeader: any;
  patientList: any;
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
    bu_id:'',
    patient_id: '',
    product_id: '',
    product_type: '',
    product_cost: Number(0),
    product_name: '',
    product_qty: Number(0),
    product_value: Number(0),
    other_charge1: Number(0),
    other_charge2: Number(0),
    other_charge3: Number(0),
    other_charge_remark1: '',
    other_charge_remark2: '',
    other_charge_remark3: '',
    gross_inv_amount: Number(0),
    discount1: Number(0),
    discount2: Number(0),
    discount3: Number(0),
    discount_remark1: '',
    discount_remark2: '',
    discount_remark3: '',
    gross_discount: Number(0),
    net_amount: Number(0),
    net_balance: Number(0),
    net_paid: Number(0),

  }
  dialysisProductsNameList: string[] = [];
  labProductNameList: string[] = [];
  pharmacyProductNameList: string[] = [];
  filteredOptions: Observable<any[]> | undefined;
  constructor(private bs: BillingService,
    private dialog: MatDialog, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fetchBu();
    // this.fetchProductBasedonType();
    // this.fetchPharmacyProducts();
    // this.fetchLabProducts();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );



  }

  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
    })
  }
  fetchUser() {
    this.bs.fetchUserData(this.mobile_no).subscribe(data => {
      this.patientDetail = true;
      //this.patientHeader = data.results;
      this.patientList = data.results;
      this.showPatientList(this.patientList);
      console.log(data);
    })
  }
  showPatientList(result: any) {
    const dialogRef = this.dialog.open(PatientListDialogComponent, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe(data => {
      this.billingItem.patient_id = data.patient_id;
      this.bs.fetchHeader(data.patient_id).subscribe(data => {
        this.headerDetail = true;
        this.patientHeader = data;
      });

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
    this.billingItem.product_cost = parseInt(data.value.product_price);
    this.calclulateOthercharges(this.billingItem.product_cost);
  }
  displayProperty(value: any) {
    if (value) {
      //this.billingItem.amount = value.selling_price;
      return value.product_name;
    }
  }

  fetchProductNew(data: any) {

    this.options = [];
    switch (data?.value) {
      case 'DIALY': {
        this.bs.fetchProducts(data.value).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
        break;
      }
      case 'PHARM': {
        this.bs.fetchProducts(data.value).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })


        // this.options = this.pharmacyProducts;


        break;
      }
      case 'LAB': {
        this.bs.fetchProducts(data.value).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
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
    //this.billingItem.patient_id = this.patientHeader.patient_id;
    this.billingArray.push(this.billingItem);
    this.showBillingForm = false;
    this.options = [];
    this.calculateFinal();
    this.resetFields();
  }

  calculateAmountPerQty(data: number) {
    this.billingItem.product_value = (this.billingItem.product_qty * this.billingItem.product_cost);
    this.calclulateOthercharges(data);
  }

  calclulateOthercharges(data: number) {
    this.billingItem.gross_inv_amount = (this.billingItem.product_qty * this.billingItem.product_cost) + this.billingItem.other_charge1 + this.billingItem.other_charge2 + this.billingItem.other_charge3;
    this.calclulateNetPay();
    //this.billingItem.gross = 4+5;
  }
  calclulateDiscount(data: number) {
    this.billingItem.gross_discount = this.billingItem.discount1 + this.billingItem.discount2 + this.billingItem.discount3;
    this.calclulateNetPay();
  }

  calclulateNetPay() {
    this.billingItem.net_amount = (this.billingItem.gross_inv_amount) - this.billingItem.gross_discount;
    //this.calculateFinal();
  }

  calculateFinal() {
    this.finalPay = this.finalPay + this.billingItem.net_amount;
    localStorage.setItem('billingarray', JSON.stringify(this.billingArray));

  }
getBuName(bu_id:any){

  switch(bu_id){
    case 'DIALY':{
      return 'Dialysis'
      break;
    }
    case 'PHARMA':{
      return 'Pharmacy'
      break;
    }
    case 'LAB':{
      return 'Lab'
      break;
    }
    default:{
      return 'none'
    }
  }
}
  constructBillPayload() {
    let billPayload = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      patient_id: this.patientHeader.patient_id, invoice_details: this.billingArray
    }
    return billPayload;
  }

  submitData() {
    let payload = this.constructBillPayload();

    this.bs.submitInvoice(payload).subscribe(data => {
      console.log(data);
      this.bs.invoice_no = data.invoice_no;
      this.bs.patient_id = this.patientHeader.patient_id;
      this.router.navigate(['invoice']);
    })

    // this.router.navigate(['/payment']);
  }

  resetFields() {
    this.billingItem = {
      bu_id:'',
      patient_id: '',
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      product_name: '',
      product_qty: Number(0),
      product_value: Number(0),
      other_charge1: Number(0),
      other_charge2: Number(0),
      other_charge3: Number(0),
      other_charge_remark1: '',
      other_charge_remark2: '',
      other_charge_remark3: '',
      gross_inv_amount: Number(0),
      discount1: Number(0),
      discount2: Number(0),
      discount3: Number(0),
      discount_remark1: '',
      discount_remark2: '',
      discount_remark3: '',
      gross_discount: Number(0),
      net_amount: Number(0),
      net_balance: Number(0),
      net_paid: Number(0),
    }
  }

  editBilling(item: any) {

    this.showItemDetails = true;
    item.invoice_details[0].bu_id = 'PHARMA'
    this.billingArray = item.invoice_details;
  }
  editItem(item:any){
    this.showBillingForm = true;
    item.bu_id='PHARMA';
    this.billingItem = item;
  }

}
function MdAutocompleteTrigger(MdAutocompleteTrigger: any) {
  throw new Error('Function not implemented.');
}

