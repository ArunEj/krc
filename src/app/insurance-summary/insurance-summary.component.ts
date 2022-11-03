import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InsuranceService } from '../insurance/insurance.service';
import { InsSummaryService } from './insurance-summary.service';

@Component({
  selector: 'app-insurance-summary',
  templateUrl: './insurance-summary.component.html',
  styleUrls: ['./insurance-summary.component.scss']
})
export class InsuranceSummaryComponent implements OnInit {

  insSummaryForm!: FormGroup;
  tableData: any;
  
  constructor(private formBuilder: FormBuilder,
    private insSumService: InsSummaryService,
    private router: Router, private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.insSummary();
  }

  insSummary() {
    this.insSummaryForm = this.formBuilder.group(
      {
        month: ['', []],
        year: ['', []]
      }
    );
  }

  getInsuSummay() {
    let month = this.insSummaryForm.value.month;
    let year = this.insSummaryForm.value.year;
    this.insSumService.getInsSummaryList(month, year).subscribe( data => {
      
      this.tableData = data.results;
      console.log(this.tableData);
    })
  }

  goToInsScreen(data: any) {
    console.log(data);
    let month = this.insSummaryForm.value.month;
    let year = this.insSummaryForm.value.year;
    this.insuranceService.setInsurancedata({data, month, year});
    this.router.navigate(['/insurance']);
    
  }
}
