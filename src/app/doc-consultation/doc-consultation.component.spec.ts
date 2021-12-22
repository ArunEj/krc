import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocConsultationComponent } from './doc-consultation.component';

describe('DocConsultationComponent', () => {
  let component: DocConsultationComponent;
  let fixture: ComponentFixture<DocConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
