import { TestBed } from '@angular/core/testing';

import { SatzService } from './satz.service';

describe('SatzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SatzService = TestBed.get(SatzService);
    expect(service).toBeTruthy();
  });
});
