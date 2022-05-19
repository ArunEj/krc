import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../patient-registration/patient.model';
import { ManageDialogService } from './manage-dialog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.scss']
})
export class ManageDialogComponent implements OnInit {
phone_no:any;
patientData:any;
  constructor(
    public dialogRef: MatDialogRef<ManageDialogComponent> ,
    private manageDialog:ManageDialogService , private router: Router  
  ) { }

  ngOnInit(): void {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchDetails(){
    this.manageDialog.fetchUserData(this.phone_no).subscribe(response=>{
      if(response.results && response.results.length>0){
        console.log(response);
        this.patientData = response.results[0];
        this.router.navigate(['/patient-reg'],  {state: this.patientData });
      }
    })
  }

}
