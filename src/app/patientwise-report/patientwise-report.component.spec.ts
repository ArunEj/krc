import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientwiseReportComponent } from './patientwise-report.component';

describe('PatientwiseReportComponent', () => {
  let component: PatientwiseReportComponent;
  let fixture: ComponentFixture<PatientwiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientwiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientwiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
