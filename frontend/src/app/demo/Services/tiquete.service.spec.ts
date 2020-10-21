import { TestBed } from '@angular/core/testing';

import { TiqueteService } from './tiquete.service';

describe('TiqueteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiqueteService = TestBed.get(TiqueteService);
    expect(service).toBeTruthy();
  });
});
