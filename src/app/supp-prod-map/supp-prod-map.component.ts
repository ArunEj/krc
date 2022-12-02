import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BillingService } from '../billing/billing.service';
import { PoService } from '../po/po.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { suppProdService } from './supp-prod-map.service';

@Component({
  selector: 'app-supp-prod-map',
  templateUrl: './supp-prod-map.component.html',
  styleUrls: ['./supp-prod-map.component.scss']
})
export class SuppProdMapComponent implements OnInit {
  mainSuppForm!: FormGroup;
  suppTableData: any[] = [];
  isShowTable: boolean = false;
  isShowEdit: boolean = true;
  buList: any;
  branchList: any;
  prodList: any;
  dataSource: any;
  displayedColumns: string[] = ['source_product_id', 'target_product_id', 'qty_impact', 'active_flag', 'edit'];
  updateData: any;

  constructor(private formBuilder: FormBuilder, private spService: suppProdService, 
      private bs: BillingService, private pos: PoService, private dialog: MatDialog) { }

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
    this.dataSource = new MatTableDataSource(this.suppTableData);
    this.suppTableData.length > 0 ? this.isShowTable = true : this.isShowTable = false;
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
      inventory_products: this.suppTableData,
    }
    this.spService.createSP(params).subscribe(data => {
      console.log(data);
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Product Map Created Successfully!!!'
      })
      this.suppTableData.length = 0;
      this.isShowTable = false;
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

  edit(element: any) {
    this.isShowEdit = false;
    console.log(element)
    this.updateData = element;
    this.mainSuppForm.controls.target_bu_id.setValue(element.target_bu_id);
    this.mainSuppForm.controls.target_product_id.setValue(element.target_product_id);
    this.mainSuppForm.controls.qty_impact.setValue(element.qty_impact);
    this.mainSuppForm.controls.active_flag.setValue(element.active_flag);
  }

  editList() {
    let getValue = this.suppTableData.find((element:any)=> element.id == this.updateData.id);
    this.suppTableData.forEach((element:any) => {
      if(element.id == getValue.id){
          //set values
          element.target_product_id = this.mainSuppForm.controls.target_product_id.value; 
          element.source_product_id = this.mainSuppForm.controls.source_product_id.value; 
          element.qty_impact = this.mainSuppForm.controls.qty_impact.value;
          element.active_flag = this.mainSuppForm.controls.active_flag.value;
        }
        
      });
      this.clearFields();
      this.isShowEdit = true;
  }

  getProdList() {
    let prodId = this.mainSuppForm.controls.source_product_id.value;
    let branchId = this.mainSuppForm.controls.inventory_branch.value;
    this.spService.getSP(branchId, prodId).subscribe(data => {
      console.log(data);
      this.isShowTable = true;
      this.dataSource = new MatTableDataSource(data.results);
    })
  }
}
