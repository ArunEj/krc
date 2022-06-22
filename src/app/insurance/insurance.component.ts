import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice/invoice.service';
import { PatientListDialogComponent } from '../utilities/patient-list-dialog/patient-list-dialog.component';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AptBookingService } from '../apt-booking/apt-booking.service';
import { InsuranceService } from './insurance.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  @Input()
  billing = false;
  @Output()
  billingItem = new EventEmitter();
  mobile_no: string = '';
  invoiceDetails: any;
  patientInvoiceDetail = false;
  patientHeader: any;
  patientList = [];
  insuranceform!: FormGroup;
  doctorList: any;
  buList: any;
  isShowPatientInputForm: boolean = false;
  patientInputForm!: FormGroup;
  isShowPatientHeader: boolean = false;

  constructor(private is: InvoiceService,private dialog: MatDialog, private router: Router,
    private formBuilder: FormBuilder, private aptService: AptBookingService, private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.fetchDoctorsByBranchId();
    this.fetchBu();
    this.headerForm();
    this.patientForm();
  }

  headerForm() {
    this.insuranceform = this.formBuilder.group(
      {
        doctor_id: ['', Validators.required],
        bu_id: ['',[Validators.required]],
        diagnosis: ['', [Validators.required]],
        history: ['', Validators.required],
        footer: ['', Validators.required]
      }
    );
  }

  patientForm() {
    this.patientInputForm = this.formBuilder.group(
      {
        dialysis_date: ['', Validators.required],
        hd_start_time: ['',[Validators.required]],
        hd_end_time: ['', [Validators.required]],
        hd_duration: ['', Validators.required],
        pre_wt: ['', Validators.required],
        pre_bt: ['', Validators.required],
        pre_pulse: ['', Validators.required],
        pre_temp: ['', Validators.required],
        post_wt: ['', Validators.required],
        post_bt: ['', Validators.required],
        post_pulse: ['', Validators.required],
        post_temp: ['', Validators.required],
        curr_flow: ['', Validators.required],
        fluid_removal: ['', Validators.required],
        complication: ['', Validators.required],
        drugs: ['', Validators.required],
      }
    );
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
          this.patientHeader = data;
          this.isShowPatientHeader = true;
          this.isShowPatientInputForm = true;
        }
      })
      this.is.fetchInvoices(data.patient_id).subscribe(data => {
        this.patientInvoiceDetail = true;
        this.invoiceDetails = data.results;
        console.log("invoiceDetails",this.invoiceDetails)
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

  //get Doctor list
  fetchDoctorsByBranchId() {
    this.aptService.fetchDoctors().subscribe(data => {
      this.doctorList = data.results;
      console.log("doctorlist",this.doctorList)
    })
  }

  //get Bu Id
  fetchBu() {
    this.insuranceService.fetchBuList().subscribe(data => {
      this.buList = data.results;
      console.log("buList",this.buList)
    })
  }

  constructParam() {
    let params = {
      org_id: localStorage.getItem('org_id'), branch_id: localStorage.getItem('branch_id'), user_id: localStorage.getItem('user_id'),
      patient_id: this.patientHeader.patient_id, doctor_id: this.insuranceform.controls.doctor_id.value,
      bu_id: this.insuranceform.controls.bu_id.value, header_remarks1: this.insuranceform.controls.diagnosis.value,
      header_remarks2: this.insuranceform.controls.history.value,
      footer_remarks: this.insuranceform.controls.footer.value
    }
    return params;
  }

  //submit Data
  submitData() {
    console.log("insuranceForm",this.insuranceform.controls)

    // this.isShowPatientInputForm = true;
    let getParams = this.constructParam();

    this.insuranceService.submitInsurance(getParams).subscribe(data => {
      console.log(data);
      this.isShowPatientInputForm = true;
      this.isShowPatientHeader = false;
      // this.bs.invoice_no = data.invoice_no;
      // this.bs.patient_id = this.patientHeader.patient_id;
    })
  }

  //getDuration
  getEndTime() {
    const date2 = this.patientInputForm.controls.hd_end_time.value;
    const date1 = this.patientInputForm.controls.hd_start_time.value;

    const diffInMs = Date.parse(date2) - Date.parse(date1);
    const diffInHours = diffInMs / 1000 / 60 / 60;

    console.log(diffInHours);
  }

  //Prev
  prev() {

  }

  //Next
  next() {

  }

  //save
  save() {

  }

  //submit
  nextPrev() {

  }
}
