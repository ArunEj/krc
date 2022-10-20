import { TestBed } from '@angular/core/testing';

import { PaymentReceiptsService } from './payment-receipts.service';

describe('PaymentReceiptsService', () => {
  let service: PaymentReceiptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentReceiptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
