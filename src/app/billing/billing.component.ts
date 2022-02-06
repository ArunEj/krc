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
  billingItem = {
    product_id: '',
    product_type: '',
    product_cost: Number(0),
    product_name: '',
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
    netpaid: Number(0)
  }
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
    this.billingItem.product_cost = parseInt(data.value.selling_price);
    this.calclulateOthercharges(this.billingItem.product_cost);
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
    this.billingItem = {
      product_id: '',
      product_type: '',
      product_cost: Number(0),
      product_name: '',
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
      netpaid: Number(0)
    }
  }

  calclulateOthercharges(data: number) {
    this.billingItem.gross_inv_amount = this.billingItem.product_cost + this.billingItem.charge1 + this.billingItem.charge2 + this.billingItem.charge3;
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

  }

  submitData() {
    this.bs.submitInvoice(this.billingArray)
    console.log(this.billingArray);
  }

}
