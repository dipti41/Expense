import { TestBed } from '@angular/core/testing';

import { ExpserviceService } from './expservice.service';

describe('ExpserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpserviceService = TestBed.get(ExpserviceService);
    expect(service).toBeTruthy();
  });
});
