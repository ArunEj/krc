import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AptBookingComponent } from './apt-booking.component';

describe('AptBookingComponent', () => {
  let component: AptBookingComponent;
  let fixture: ComponentFixture<AptBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AptBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AptBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
