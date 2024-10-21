import { TestBed } from '@angular/core/testing';

import { RuptureService } from './rupture.service';

describe('RuptureService', () => {
  let service: RuptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
