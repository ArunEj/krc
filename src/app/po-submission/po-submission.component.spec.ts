import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoSubmissionComponent } from './po-submission.component';

describe('PoSubmissionComponent', () => {
  let component: PoSubmissionComponent;
  let fixture: ComponentFixture<PoSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
