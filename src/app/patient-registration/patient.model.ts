export interface Patient {
    branch_id: string,
    photo?: string,
    patient_name: string,
    dob: string,
    address: string,
    communicate_address?: string,
    email_id?: string,
    mobile_no: string,
    alt_mobile_no?: string,
    alt_email_id?: string,
    aadhar_no?: string,
    first_visit_date?: string,
    sex: string,
    updated_by?: string,
    updated_date?: string,
    patient_type?: string,
    org_id: string,
    user_id: string;
    blood_group?: string,
    ailment?: string,
    age?: string,
    husband_name?: string,
    guardian_name?: string,
    guardian_type?: string,
    father_name: string
}

export interface PatientType {
    ref_code: string,
    ref_type: string,
    ref_desc: string
}