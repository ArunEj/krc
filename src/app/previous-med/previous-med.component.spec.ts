import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousMedComponent } from './previous-med.component';

describe('PreviousMedComponent', () => {
  let component: PreviousMedComponent;
  let fixture: ComponentFixture<PreviousMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
