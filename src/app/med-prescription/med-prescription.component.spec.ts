import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPrescriptionComponent } from './lab-prescription.component';

describe('LabPrescriptionComponent', () => {
  let component: LabPrescriptionComponent;
  let fixture: ComponentFixture<LabPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
