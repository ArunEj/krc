import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRegisterReportComponent } from './stock-register-report.component';

describe('StockRegisterReportComponent', () => {
  let component: StockRegisterReportComponent;
  let fixture: ComponentFixture<StockRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
