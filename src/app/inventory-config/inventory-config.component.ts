import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from '../billing/billing.service';
import { PoService } from '../po/po.service';
import { suppProdService } from '../supp-prod-map/supp-prod-map.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { inventoryConfigService } from './inventory-config.service';

@Component({
  selector: 'app-inventory-config',
  templateUrl: './inventory-config.component.html',
  styleUrls: ['./inventory-config.component.scss']
})
export class InventoryConfigComponent implements OnInit {
  inventoryForm!: FormGroup;
  buList: any;
  branchList: any;
  prodList: any;

  constructor(private formBuilder: FormBuilder, private icService: inventoryConfigService, 
    private dialog: MatDialog, private bs: BillingService, private pos: PoService, private spService: suppProdService,) { }

  ngOnInit(): void {
    this.inventory();
    this.fetchBu();
    this.getBranch();
  }

  inventory() {
    this.inventoryForm = this.formBuilder.group(
      {
        inventory_branch: ['', []],
        bu_id: ['', ],
        product: ['', []],
        inventory_part: ['', []]
      }
    );
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

  fetchBu() {
    this.bs.fetchBuList().subscribe(data => {
      this.buList = data.results;
    })
  }

  setProductId() {
    
  }

  submit() {
    let params = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id":localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "part_of_inventory": this.inventoryForm.controls.inventory_part.value,
      "product_id": this.inventoryForm.controls.product.value
    }
    this.icService.createInv(params).subscribe(data => {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Inventory Config Saved Successfully!!!'
      })
    })
  }
}