import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstantingInvwiseComponent } from './outstanting-invwise.component';

describe('OutstantingInvwiseComponent', () => {
  let component: OutstantingInvwiseComponent;
  let fixture: ComponentFixture<OutstantingInvwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstantingInvwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstantingInvwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
