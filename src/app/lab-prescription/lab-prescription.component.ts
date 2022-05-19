import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LabPreparationService } from './lab-preparation.service';
import { UtilityService } from '../utilities/services/utility.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-lab-prescription',
  templateUrl: './lab-prescription.component.html',
  styleUrls: ['./lab-prescription.component.scss']
})
export class LabPrescriptionComponent implements OnInit {
  @Input()
  headerDetail:any;
  labTest: LabItem[] = [];
  displayedColumns = ['id', 'product_name', 'visit_date','remarks', 'action'];
  labPayload = {};
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;

  constructor(private lpService: LabPreparationService,
    private utility:UtilityService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.lpService.fetchProducts('LAB').subscribe(data => {
      this.labTest = data.results;
    });
  }

  addRecord() {
    let length = this.dataSource.data.length;
    this.dataSource.data.push({
      id:this.dataSource.data.length, product_name: '',visit_date:'', remarks: ''
    });
    this.table?.renderRows();
  }

  delete_item(item: any) {
    let dataArray = this.dataSource.data;

    dataArray.splice(item.id, 1);

    this.dataSource.data = dataArray;
    this.table?.renderRows();
    
  }

  updateLabDetails(){
    this.labPayload = {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "patient_id": this.headerDetail.patient_id,
      "doctor_id": localStorage.getItem('user_id'),
      "user_id": localStorage.getItem('user_id'),
      "business_id": "",
      "visit_date": this.utility.convertTodayTostr(),
      "lab_details":[]
    }

    // this.lpService.updateLabDetails(this.labPayload).subscribe(data=>{
    //  this.dialog.open(InfoDialogComponent, {
    //   width: '500px',
    //   data: 'Lab Details Saved Successfully'
    //  })
    // })
  }


}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fav: string;
}

export interface LabItem {
  id?: any;
  bu_id?: string;
  product_id?: string;
  product_name: string;
  visit_date?:string;
  remarks: string;
}

const ELEMENT_DATA: LabItem[] = [];
