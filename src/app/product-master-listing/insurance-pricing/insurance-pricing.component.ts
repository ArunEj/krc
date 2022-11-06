import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReferenceService } from 'src/app/utilities/services/reference.service';

@Component({
  selector: 'app-insurance-pricing',
  templateUrl: './insurance-pricing.component.html',
  styleUrls: ['./insurance-pricing.component.scss']
})
export class InsurancePricingComponent implements OnInit {
  @Input()
  prod_obj: any;
  @Output()
  emitBack = new EventEmitter();
  tableData: any = [];
  ins_types:any = [];
  constructor(private ref:ReferenceService) { }

  ngOnInit(): void {
    this.ref.getPatientTypes().subscribe(data=>{
      this.ins_types= data.results;
    })
  }
  addRecord() {
    this.tableData.push({
      id: this.tableData.length,
      medicine_id: '',
      selling_price: 0,
      eff_from: '',
      eff_to: '',
      ins_type: ''
    })
  }

  delete_item(item: any) {
    this.tableData.splice(item.id, 1);

  }
  updateIP() {
    //service call
    this.emitBack.emit();
  }

}
