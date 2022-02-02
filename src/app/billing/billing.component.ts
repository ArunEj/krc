import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BillingService } from './billing.service';
import { BillingItem, billingProduct } from './billing.model';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  billingArray: any = [];
  showModal = false;
  finalPay: number = 0;
  showBillingForm = false;
  myControl = new FormControl();
  options: any = [];
  dialysisProducts: BillingItem[] = [];
  labProducts: BillingItem[] = [];
  pharmacyProducts: BillingItem[] = [];
  billingItem = { product_id: '', product_type: '', amount: Number(0), product_name: '', oc1: Number(0), oc2: Number(0), oc3: Number(0), gross: Number(0), d1: Number(0), d2: Number(0), d3: Number(0), total_discount: Number(0), netpay: Number(0), finalAmount: Number(0), amount_received: Number(0) }
  dialysisProductsNameList: string[] = [];
  labProductNameList: string[] = [];
  pharmacyProductNameList: string[] = [];
  filteredOptions: Observable<any[]> | undefined;
  constructor(private bs: BillingService) { }

  ngOnInit(): void {

    this.fetchProductBasedonType();
    this.fetchPharmacyProducts();
    this.fetchLabProducts();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
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
    this.billingItem.amount = parseInt(data.value.selling_price);
    this.calclulateNetPay();
  }
  public displayProperty(value: any) {
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

        break;
      }
      case 'PHARMACY': {
        this.options = this.pharmacyProducts;

        break;
      }
      case 'LAB': {
        this.options = this.labProducts;
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


  addItem() {
    this.billingArray.push(this.billingItem);
    this.showBillingForm = false;
    this.options = [];
    this.calculateFinal();
    this.billingItem = { product_id: '', product_type: '', amount: Number(0), product_name: '', oc1: Number(0), oc2: Number(0), oc3: Number(0), gross: Number(0), d1: Number(0), d2: Number(0), d3: Number(0), total_discount: Number(0), netpay: Number(0), finalAmount: Number(0), amount_received: Number(0) };
  }

  calclulateOthercharges(data: number) {
    this.billingItem.gross = this.billingItem.oc1 + this.billingItem.oc2 + this.billingItem.oc3;
    this.calclulateNetPay();
    //this.billingItem.gross = 4+5;
  }
  calclulateDiscount(data: number) {
    this.billingItem.total_discount = this.billingItem.d1 + this.billingItem.d2 + this.billingItem.d3;
    this.calclulateNetPay();
  }

  calclulateNetPay() {
    this.billingItem.netpay = (this.billingItem.gross + this.billingItem.amount) - this.billingItem.total_discount;
    //this.calculateFinal();
  }

  calculateFinal() {
   
       this.finalPay = this.finalPay+ this.billingItem.netpay;
    
    
  }

  submitData() {
    alert('data to be sent to backend and saved in db')
  }

}
