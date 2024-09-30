import { TestBed } from '@angular/core/testing';

import { TodayDateService } from './today-date.service';

describe('TodayDateService', () => {
  let service: TodayDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
