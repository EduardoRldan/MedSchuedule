import { TestBed } from '@angular/core/testing';

import { BlobConversionService } from './blob-conversion.service';

describe('BlobConversionService', () => {
  let service: BlobConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlobConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
