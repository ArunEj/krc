import { TestBed } from '@angular/core/testing';

import { PatientHeaderService } from './patient-header.service';

describe('TientHeaderService', () => {
  let service: PatientHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
