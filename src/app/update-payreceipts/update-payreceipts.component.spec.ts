import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePayreceiptsComponent } from './update-payreceipts.component';

describe('UpdatePayreceiptsComponent', () => {
  let component: UpdatePayreceiptsComponent;
  let fixture: ComponentFixture<UpdatePayreceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePayreceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePayreceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
