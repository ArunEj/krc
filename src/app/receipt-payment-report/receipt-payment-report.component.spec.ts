import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptPaymentReportComponent } from './receipt-payment-report.component';

describe('ReceiptPaymentReportComponent', () => {
  let component: ReceiptPaymentReportComponent;
  let fixture: ComponentFixture<ReceiptPaymentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptPaymentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
