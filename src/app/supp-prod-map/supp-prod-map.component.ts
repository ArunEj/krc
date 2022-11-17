import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supp-prod-map',
  templateUrl: './supp-prod-map.component.html',
  styleUrls: ['./supp-prod-map.component.scss']
})
export class SuppProdMapComponent implements OnInit {
  mainSuppForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mainSupp();
  }

  mainSupp() {
    this.mainSuppForm = this.formBuilder.group(
      {
        inventory_branch: ['', []],
        SourceBu_id: ['', ],
        Source_prod: ['', []]
      }
    );
  }
}
