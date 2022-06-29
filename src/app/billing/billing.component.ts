import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BillingService } from './billing.service';
import { BillingItem, Bu } from './billing.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { InvoiceComponent } from '../invoice/invoice.component';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    bu_id: [null, {
      validators: [Validators.required],
      updateOn: "change"
    }],
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
    discount2: [],
    discount3: [],
    total_discount: [],
    net_amount: []

  });
  showItemDetails = false;
  editBillingItem = false;
  selectedBu: any;
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
    bu_id: '',
    patient_id: '',
    product_id: '',
    product_type: '',
    product_cost: Number(0),
    product_name: '',
    product_qty: 1,
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

  filteredOptions: Observable<any[]> | undefined;
  constructor(private bs: BillingService,
    private dialog: MatDialog, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.fetchBu();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
      // this.myForm.get('bu_id')?.setValue('PHARM');
      // this.fetchProductNew('PHARM');
      // this.myControl.setValue('EID Injection');
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

  setProductCost(data: any) {
    this.billingItem.product_id = data.value.product_id;
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
    this.billingItem.bu_id = data;
    this.resetFieldsCalculation();
    switch (data) {
      case 'DIALY': {
        this.bs.fetchProducts(data).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
        break;
      }
      case 'PHARM': {
        this.bs.fetchProducts(data).subscribe(data => {
          this.options = data.results;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
        })
        break;
      }
      case 'LAB': {
        this.bs.fetchProducts(data).subscribe(data => {
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

  fetchProductsDynamic(data: any) {

    this.options = [];
    this.billingItem.bu_id = data;
    this.resetFieldsCalculation();
    this.bs.fetchProducts(data).subscribe(data => {
      this.options = data.results;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    })
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: { product_name: string; }) => option.product_name.toLowerCase().includes(filterValue));
  }

  calculateAmountPerQty(data: number) {
    this.billingItem.product_value = (this.billingItem.product_qty * this.billingItem.product_cost);
    this.calclulateOthercharges(data);
  }

  calclulateOthercharges(data: number) {
    this.setChargesMandatory();
    this.billingItem.gross_inv_amount = (this.billingItem.product_qty * this.billingItem.product_cost) + this.billingItem.other_charge1 + this.billingItem.other_charge2 + this.billingItem.other_charge3;
    this.calclulateNetPay();
    //this.billingItem.gross = 4+5;
  }
  calclulateDiscount(data: number) {
    this.setDiscountMandatory();
    this.billingItem.gross_discount = this.billingItem.discount1 + this.billingItem.discount2 + this.billingItem.discount3;
    this.calclulateNetPay();
  }

  setDiscountMandatory() {
    if (this.billingItem.discount1) {
      this.myForm.get('discount_remark1')?.setValidators([Validators.required]);
      this.myForm.get('discount_remark1')?.updateValueAndValidity();
    }
    if (this.billingItem.discount2) {
      this.myForm.get('discount_remark2')?.setValidators([Validators.required]);
      this.myForm.get('discount_remark2')?.updateValueAndValidity();
    }
    if (this.billingItem.discount3) {
      this.myForm.get('discount_remark3')?.setValidators([Validators.required]);
      this.myForm.get('discount_remark3')?.updateValueAndValidity();
    }
  }

  setChargesMandatory() {
    if (this.billingItem.other_charge1) {
      this.myForm.get('other_charge_remark1')?.setValidators([Validators.required]);
      this.myForm.get('other_charge_remark1')?.updateValueAndValidity();
    }
    if (this.billingItem.other_charge2) {
      this.myForm.get('other_charge_remark2')?.setValidators([Validators.required]);
      this.myForm.get('other_charge_remark2')?.updateValueAndValidity();
    }
    if (this.billingItem.other_charge3) {
      this.myForm.get('other_charge_remark3')?.setValidators([Validators.required]);
      this.myForm.get('other_charge_remark3')?.updateValueAndValidity();
    }
  }

  calclulateNetPay() {
    this.billingItem.net_amount = (this.billingItem.gross_inv_amount) - this.billingItem.gross_discount;
    //this.calculateFinal();
  }

  calculateFinal() {
    this.finalPay = this.finalPay + this.billingItem.net_amount;
    localStorage.setItem('billingarray', JSON.stringify(this.billingArray));

  }
  getBuName(bu: any) {

    switch (bu.bu_id) {
      case 'DIALY': {
        return 'Dialysis'
        break;
      }
      case 'PHARM': {
        return 'Pharmacy'
        break;
      }
      case 'LAB': {
        return 'Lab'
        break;
      }
      default: {
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
    console.log(payload)
    this.bs.submitInvoice(payload).subscribe(data => {
      console.log(data);
      this.bs.invoice_no = data.invoice_no;
      this.bs.patient_id = this.patientHeader.patient_id;
     // this.router.navigate(['invoice']);
     this.router.navigate(['invoice', this.bs.invoice_no]);
    })
    
    

  }
  addItem() {

    this.billingArray.push(this.billingItem);
    this.showBillingForm = false;
    this.options = [];
    this.calculateFinal();
    this.resetFields();

  }
  cancelNewItem() {
    if (this.editBillingItem) {
      this.billingArray.push(this.billingItemCopy)
    }

    this.resetFields();
    this.showBillingForm = false;
    this.editBillingItem = false;

  }
  billingItemCopy: any;
  editItem(item: any, index: any) {
    this.editBillingItem = true;
    this.showBillingForm = true;
    //item.bu_id = 'PHARMA';
    this.myForm.get('bu_id')?.setValue(item.bu_id);
    this.fetchProductNew(item.bu_id);
    this.billingItem = item;
    this.billingItemCopy = Object.assign({}, this.billingItem);
    this.billingArray.splice(index, 1)
  }
  updateItem() {
    this.editBillingItem = false;
    this.showBillingForm = false;
    this.billingArray.push(this.billingItem);
    this.resetFields();
  }
  resetFields() {
    this.billingItem = {
      bu_id: '',
      patient_id: '',
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      product_name: '',
      product_qty: Number(1),
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
    this.myForm.get('bu_id')?.setValue('');
  }
  resetFieldsCalculation() {
    this.billingItem = {
      bu_id: this.billingItem.bu_id,
      patient_id: '',
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      product_name: '',
      product_qty: Number(1),
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
    // this.myForm.get('bu_id')?.setValue('');
  }

  editBilling(item: any) {

    this.showItemDetails = true;
    item.invoice_details[0].bu_id = 'PHARMA'

    this.billingArray = item.invoice_details;
  }


}
function MdAutocompleteTrigger(MdAutocompleteTrigger: any) {
  throw new Error('Function not implemented.');
}

