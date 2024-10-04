import { TestBed } from '@angular/core/testing';

import { ObjectHandlerService } from './object-handler.service';

describe('ObjectHandlerService', () => {
  let service: ObjectHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
