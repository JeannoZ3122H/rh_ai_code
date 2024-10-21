import { TestBed } from '@angular/core/testing';

import { GratificationService } from './gratification.service';

describe('GratificationService', () => {
  let service: GratificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GratificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
