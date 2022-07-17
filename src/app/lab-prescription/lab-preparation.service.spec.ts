import { TestBed } from '@angular/core/testing';

import { LabPreparationService } from './lab-preparation.service';

describe('LabPreparationService', () => {
  let service: LabPreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabPreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
