import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalPricingComponent } from './normal-pricing.component';

describe('NormalPricingComponent', () => {
  let component: NormalPricingComponent;
  let fixture: ComponentFixture<NormalPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
