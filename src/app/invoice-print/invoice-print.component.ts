import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice/invoice.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { PromptDialogComponent } from '../utilities/prompt-dialog/prompt-dialog.component';
import { InvoicePrintService } from './invoice-print.service';
import * as _ from 'lodash'; 
import { ReferenceService } from '../utilities/services/reference.service';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit {
  invoiceData: any;
  invoiceTableData: any;
  @Input()
  billing = false;
  @Output()
  billingItem = new EventEmitter();
  mobile_no: string = '';
  invoiceDetails: any;
  patientInvoiceDetail = false;
  patientHeaderData: any;
  patientList = [];
  isShowPrint: boolean = false;
  orgId: any;
  branchId: any;
  isShowEstimateData: boolean = false;
  invoiceNumber: any;
  invoiceDate: any;
  today: any;
  createdBy: any;
  refList: any;
  invoiceStatusDetails: any;
  headerDetail: any;

  constructor(private invoicePrintService: InvoicePrintService,
    private is: InvoiceService,
    private dialog: MatDialog, private router: Router,
    private reference: ReferenceService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.orgId = localStorage.getItem('org_id');
    this.branchId = localStorage.getItem('branch_id');
    this.getReferenceList();
    this.loadInvData();
    // this.fetchInvoiceStatus('A');
  }

  loadInvData(){
    if(this.invoicePrintService.getInvData()){
      this.print(this.invoicePrintService.getInvData());
      this.invoicePrintService.printData = null;
    }
  }

  getReferenceList() {
    this.reference.getPaymentModes('INVSTA').subscribe(
      (data) => {
        this.refList = data.results;
        // console.log("data",this.refList)
      },
      (err) => {
        console.log(err, "response error");
      });
  }
  printToPdf() {
    let element: HTMLElement = document.getElementById('print-section') as HTMLElement;
    
    element.click();
    // this.completeOrder();
  }

  print(item: any) {
    this.isShowPrint = true;
    this.getInvoiceData(item)
  }

  getInvoiceData(item: any) {

    this.invoicePrintService.getInvoiceList(item.invoice_no,item.patient_id).subscribe(
      (data) => {
        this.invoiceData = data;
        this.invoiceNumber = item.invoice_no;
        this.invoiceDate = item.inv_date;
        this.createdBy = item.created_by;
        if(this.invoiceData.estimate_lists.length !== 0) {
          this.isShowEstimateData = true;
        }
        console.log("data",this.invoiceData)
      },
      (err) => {
        console.log(err, "response error");
      });
  }

  fetchUserInvoices() {
    this.is.fetchUserData(this.mobile_no).subscribe(data => {
      if (data) {
        this.patientList = data.results;
        this.showPatientList(this.patientList);
      }
    }, error => {
      if (error.error.status === 404) {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: 'patient details not found!!!'
        })
      }
    })
  }

  showPatientList(result: any) {
    const dialogRef = this.dialog.open(PatientListDialogComponent, {
      width: '500px',
      data: result,
    });

    dialogRef.afterClosed().subscribe(data => {
      this.patientList = data.results;
      this.is.fetchHeader(data.patient_id).subscribe(data => {
        if (data) {
          this.patientHeaderData = data;
          this.patientInvoiceDetail = true;
        }
      })
    });
  }

  fetchItemDetail(item: any) {
    this.is.fetchBillingDetail(item).subscribe(data => {
      // console.log(data);
      this.billingItem.emit(data);
    })
  }
  
  cancelInvoice(invoice: any) {
    let cancelObj =
    {
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "invoice_no": invoice.invoice_no,
      "inv_status": "C"

    }
    const prompt = this.dialog.open(PromptDialogComponent, {
      width: '300px',
      data: 'Are you sure want to cancel the invoice?'
    });
    prompt.afterClosed().subscribe(data=>{
      if(data){
        this.is.cancelInvoice(cancelObj).subscribe(data => {
          this.patientInvoiceDetail = false;
          this.invoiceDetails = [];
          this.dialog.open(InfoDialogComponent, {
            width: '300px',
            data: 'Invoice cancellation is successful!'
          });
    
        }, error=>{
          this.dialog.open(InfoDialogComponent, {
            width: '300px',
            data: 'Invoice cancellation is not successful!'
          });
        });
        
      }
    })
   
  }

  fetchInvoiceStatus(data: any) {
    let pt_id = this.patientHeaderData.patient_id;
    this.invoicePrintService.fetchInvoiceSectionList(data, pt_id).subscribe(data => {
      this.patientInvoiceDetail = true;
      this.invoiceStatusDetails = data.results;
    }, error => {
      if (error.error.status === 404) {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: 'Invoice details not found!!!'
        });
      }
    })
  }

  patientHeader(data: any) {
    // this.headerDetail = data;
    this.patientHeaderData = data;
    this.patientInvoiceDetail = true;
  }

  back() {
    this.isShowPrint = false;
  }
}

