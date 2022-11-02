import { TestBed } from '@angular/core/testing';

import { UpdatePayreceiptsService } from './update-payreceipts.service';

describe('UpdatePayreceiptsService', () => {
  let service: UpdatePayreceiptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePayreceiptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
