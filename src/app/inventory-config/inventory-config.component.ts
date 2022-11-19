import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from '../billing/billing.service';
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

  constructor(private formBuilder: FormBuilder, private icService: inventoryConfigService, private dialog: MatDialog, private bs: BillingService) { }

  ngOnInit(): void {
    this.inventory();
    this.fetchBu();
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