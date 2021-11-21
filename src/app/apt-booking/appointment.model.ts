import { Time } from "@angular/common";

export interface Appointment {
    patient_name: string,
    patient_id: string,
    aptDate: Date,
    doctor: string,
    aptTime?: Date,
    contact_no:string
}