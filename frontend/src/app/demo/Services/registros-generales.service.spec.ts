import { TestBed } from '@angular/core/testing';

import { RegistrosGeneralesService } from './registros-generales.service';

describe('RegistrosGeneralesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrosGeneralesService = TestBed.get(RegistrosGeneralesService);
    expect(service).toBeTruthy();
  });
});
