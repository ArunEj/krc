import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedPrescriptionComponent } from './med-prescription.component';

describe('LabPrescriptionComponent', () => {
  let component: MedPrescriptionComponent;
  let fixture: ComponentFixture<MedPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
