import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice/invoice.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { PromptDialogComponent } from '../utilities/prompt-dialog/prompt-dialog.component';
import { InvoicePrintService } from './invoice-print.service';

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
  patientHeader: any;
  patientList = [];
  isShowPrint: boolean = false;
  orgId: any;
  branchId: any;

  constructor(private invoicePrintService: InvoicePrintService,
    private is: InvoiceService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.orgId = localStorage.getItem('org_id');
    this.branchId = localStorage.getItem('branch_id');
  }
  printToPdf() {
    let element: HTMLElement = document.getElementById('print-section') as HTMLElement;
    
    element.click();
    // this.completeOrder();
  }

  print(item: any) {
    console.log("item",item)
    this.isShowPrint = true;
    this.getInvoiceData(item)
  }

  getInvoiceData(item: any) {
    // let params = new HttpParams();
    // params = params.append("org_id", this.orgId);
    // params = params.append("branch_id", this.branchId);
    // params = params.append("invoice_no", item.invoice_no,);
    // params = params.append("patient_number", item.patient_id);

    this.invoicePrintService.getInvoiceList(item.invoice_no,item.patient_id).subscribe(
      (data) => {
        this.invoiceData = data;
        console.log("data",this.invoiceData)
      },
      (err) => {
        console.log(err, "response error");
      });
  }

  // getInvoiceTableData() {

  //   this.invoiceService.getInvoiceTableList().subscribe(
  //     (data) => {
  //       // console.log("TableData", data)
  //       this.invoiceTableData = data;
  //     },
  //     (err) => {
  //       console.log(err, "response error");
  //     });
  // }
  fetchUserInvoices() {
    this.is.fetchUserData(this.mobile_no).subscribe(data => {
      if (data) {
        this.patientList = data.results;
        this.showPatientList(this.patientList);
      }

      //this.invoiceArray = data.invoice_no;
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
          this.patientHeader = data;
        }
      })
      this.is.fetchInvoices(data.patient_id).subscribe(data => {
        this.patientInvoiceDetail = true;
        this.invoiceDetails = data.results;
        console.log("invoice",this.invoiceDetails)
      }, error => {
        if (error.error.status === 404) {
          this.dialog.open(InfoDialogComponent, {
            width: '300px',
            data: 'Invoice details not found!!!'
          });
        }
      })
    });
  }

  fetchItemDetail(item: any) {
    this.is.fetchBillingDetail(item).subscribe(data => {
      console.log(data);
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
}

