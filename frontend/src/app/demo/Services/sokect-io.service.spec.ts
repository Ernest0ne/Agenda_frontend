import { TestBed } from '@angular/core/testing';

import { SokectIoService } from './sokect-io.service';

describe('SokectIoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SokectIoService = TestBed.get(SokectIoService);
    expect(service).toBeTruthy();
  });
});
