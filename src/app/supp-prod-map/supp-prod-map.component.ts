import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingService } from '../billing/billing.service';
import { PoService } from '../po/po.service';
import { suppProdService } from './supp-prod-map.service';

@Component({
  selector: 'app-supp-prod-map',
  templateUrl: './supp-prod-map.component.html',
  styleUrls: ['./supp-prod-map.component.scss']
})
export class SuppProdMapComponent implements OnInit {
  mainSuppForm!: FormGroup;
  suppTableData: any[] = [];
  isShowEdit: boolean = true;
  buList: any;
  branchList: any;
  prodList: any;

  constructor(private formBuilder: FormBuilder, private spService: suppProdService, private bs: BillingService, private pos: PoService,) { }

  ngOnInit(): void {
    this.mainSupp();
    this.fetchBu();
    this.getBranch();
  }

  mainSupp() {
    this.mainSuppForm = this.formBuilder.group(
      {
        inventory_branch: ['', []],
        source_bu_id: [''],
        source_product_id: ['', ],
        target_bu_id: ['', []],
        target_product_id: ['', []],
        qty_impact: [''],
        active_flag: ['']

      }
    );
  }

  addToList() {
    const temp = {target_product_id:'', qty_impact:'', active_flag:'', source_product_id:'', id: 0}
    temp.target_product_id = '';
    temp.source_product_id = '';
    temp.qty_impact = '';
    temp.active_flag = '';
    temp.id = 0;
    
    //set values
    temp.target_product_id = this.mainSuppForm.controls.target_product_id.value; 
    temp.source_product_id = this.mainSuppForm.controls.source_product_id.value; 
    temp.qty_impact = this.mainSuppForm.controls.qty_impact.value;
    temp.active_flag = this.mainSuppForm.controls.active_flag.value;
    temp.id = this.suppTableData.length;
    this.suppTableData.push(temp);
    this.clearFields();
  }

  clearFields() {
    this.mainSuppForm.controls.target_product_id.setValue(null);
    this.mainSuppForm.controls.qty_impact.setValue(null);
    this.mainSuppForm.controls.active_flag.setValue(null);
  }

  submit() {
    let params = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      // part_of_inventory: "Y",
      suppTableData: this.suppTableData,
    }
    this.spService.createSP(params).subscribe(data => {
      console.log(data);
    })
  }

  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
    })
  }

  getBranch(){
    this.pos.getBranchList().subscribe(data => {
      this.branchList = data.results;
    })
  }

  getProduct(event: any) {
    this.spService.fetchProducts(event).subscribe(data => {
      this.prodList = data.results;
    })
  }
}

// export interface poItem {
//   item_code: string;
//   item_desc: string;
//   item_cost: string;
//   item_name: string;
//   id: number;
// }
