import { Time } from "@angular/common";

export interface Appointment {
    patient_name: string,
    patient_id: string,
    doa: Date,
    doctor: string,
    aptTime?: Date,
    contact_no:string
}