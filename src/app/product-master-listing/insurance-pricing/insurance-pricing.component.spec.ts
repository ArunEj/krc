import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePricingComponent } from './insurance-pricing.component';

describe('InsurancePricingComponent', () => {
  let component: InsurancePricingComponent;
  let fixture: ComponentFixture<InsurancePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancePricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
