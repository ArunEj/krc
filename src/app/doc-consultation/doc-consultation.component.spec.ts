import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocConsultationComponent } from './doc-consultation.component';
import { DocConsultationService } from './doc-consultation.service';

describe('DocConsultationComponent', () => {
  let component: DocConsultationComponent;
  let fixture: ComponentFixture<DocConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocConsultationComponent ],
      providers: [DocConsultationService]
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
