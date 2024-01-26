import { TestBed } from '@angular/core/testing';

import { ReviewServiceTsService } from './review.service.ts.service';

describe('ReviewServiceTsService', () => {
  let service: ReviewServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
