import { TestBed } from '@angular/core/testing';

import { AlerttoastService } from './alerttoast.service';

describe('AlerttoastService', () => {
  let service: AlerttoastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerttoastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
