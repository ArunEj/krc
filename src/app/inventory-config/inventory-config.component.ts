import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventory-config',
  templateUrl: './inventory-config.component.html',
  styleUrls: ['./inventory-config.component.scss']
})
export class InventoryConfigComponent implements OnInit {
  inventoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inventory();
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
}