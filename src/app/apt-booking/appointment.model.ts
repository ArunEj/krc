import { Time } from "@angular/common";

export interface Appointment {
    name: string,
    patientId: string,
    aptDate: Date,
    doctor: string,
    aptTime: Date,
    contact:number
}