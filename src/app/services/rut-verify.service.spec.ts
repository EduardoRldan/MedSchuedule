import { TestBed } from '@angular/core/testing';

import { RutVerifyService } from './rut-verify.service';

describe('RutVerifyService', () => {
  let service: RutVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
