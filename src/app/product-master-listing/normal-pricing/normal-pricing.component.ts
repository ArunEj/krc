import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductMasterService } from '../../product-master/product-master.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from 'src/app/utilities/info-dialog/info-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-normal-pricing',
  templateUrl: './normal-pricing.component.html',
  styleUrls: ['./normal-pricing.component.scss']
})
export class NormalPricingComponent implements OnInit {
  @Input()
  prod_obj: any;
  @Output()
  emitBack = new EventEmitter()
  myForm: FormGroup = this.fb.group({
    product_price: [null, { Validators: [Validators.required] }],
    mrp_price: [null, { Validators: [Validators.required] }],
    discount_value : [null, { Validators: [Validators.required] }],
    discount_perc: [null, { Validators: [Validators.required] }],
    eff_from: [null, { Validators: [Validators.required] }],
    eff_to: [null, { Validators: [Validators.required] }],
  })
  constructor(private fb: FormBuilder, private pms: ProductMasterService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  save() {
    let payload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      "product_pricing": [
        {
          "product_id": this.prod_obj.product_id,
          "product_price": this.myForm.get('product_price')?.value,
          "eff_from": this.myForm.get('eff_from')?.value

        }
      ]
    }
    
    this.pms.createProdP(payload).subscribe(data => {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Pricing Saved Successfully!!!'
      })
      dialogRef.afterClosed().subscribe(data => {
        this.emitBack.emit();

      })
    })


  }


  /**/
}
