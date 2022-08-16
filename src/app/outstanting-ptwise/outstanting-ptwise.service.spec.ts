import { TestBed } from '@angular/core/testing';

import { OutstandingInvwiseService } from './outstanding-invwise.service';

describe('OutstandingInvwiseService', () => {
  let service: OutstandingInvwiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutstandingInvwiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
