import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierPaymentService } from './supplier-payment.service';

@Component({
  selector: 'app-supplier-payment',
  templateUrl: './supplier-payment.component.html',
  styleUrls: ['./supplier-payment.component.scss']
})
export class SupplierPaymentComponent implements OnInit {
  supplierPaymentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private SuppPayService: SupplierPaymentService) { }

  ngOnInit(): void {
    this.supplierPayment();
  }

  supplierPayment() {
    this.supplierPaymentForm = this.formBuilder.group(
      {
        branch_id: ['', [Validators.required]],
        supplier_id: ['', Validators.required]
      }
    );
  }

  getPoSuppPayment() {
    const branchId = localStorage.getItem('branch_id');
    const suppId = this.supplierPaymentForm.controls.supplier_id.value;
    this.SuppPayService.getPoSuppPay(branchId, suppId).subscribe(data =>{
      console.log("suppPay", data);
    })
  }
}
