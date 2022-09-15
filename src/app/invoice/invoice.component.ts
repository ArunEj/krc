import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component'
import { PromptDialogComponent } from '../utilities/prompt-dialog/prompt-dialog.component';
import { CancelInvoiceDialogComponent } from '../utilities/cancel-invoice-dialog/cancel-invoice-dialog.component';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input()
  billing = false;
  @Output()
  billingItem = new EventEmitter();
  mobile_no: string = '';
  invoiceDetails: any;
  patientInvoiceDetail = false;
  //patientHeader: any;
  patientHeaderData: any
  patientList = [];
  constructor(private is: InvoiceService,
    private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      if (data?.patient_id) {
        this.loadInvoiceDetails(data?.patient_id);
      }
    })

  }

  ngOnInit(): void {
  }
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
          data: 'No Pending Invoice Payment'
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
      this.loadInvoiceDetails(data.patient_id);
    });
  }

  loadInvoiceDetails(patient_id: string) {
    this.is.fetchHeader(patient_id).subscribe(data => {
      if (data) {
        this.patientHeaderData = data;
        localStorage.setItem('header', JSON.stringify(data));
      }
    })
    this.is.fetchInvoices(patient_id).subscribe(data => {
      this.patientInvoiceDetail = true;
      this.invoiceDetails = data.results;
    }, error => {
      if (error.error.status === 404) {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: 'No Pending Invoice Payment!'
        });
      }
    })
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
      "inv_status": "C",
      "cancel_remarks": ''
    }
    const prompt = this.dialog.open(PromptDialogComponent, {
      width: '300px',
      data: 'Are you sure want to cancel the invoice?'
    });
    prompt.afterClosed().subscribe(data => {
      if (data) {
        const cinvoice = this.dialog.open(CancelInvoiceDialogComponent, {
          width: '300px',
          data: 'Please provide remarks and proceed to cancel'
        });
        cinvoice.afterClosed().subscribe(data => {
          if (data) {
            cancelObj.cancel_remarks = data;
            this.is.cancelInvoice(cancelObj).subscribe(data => {
              this.patientInvoiceDetail = false;
              this.invoiceDetails = [];
              this.dialog.open(InfoDialogComponent, {
                width: '300px',
                data: 'Invoice cancellation is successful!'
              });

            }, error => {
              this.dialog.open(InfoDialogComponent, {
                width: '300px',
                data: 'Invoice cancellation is not successful!'
              });
            });
          }

        })


      }
    })

  }
  patientHeader(data: any) {
    // this.headerDetail = data;
    this.patientHeaderData = data;
    this.patientInvoiceDetail = true;
    this.loadInvoiceDetails(data.patient_id);
  }




}
