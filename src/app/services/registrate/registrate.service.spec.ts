import { TestBed } from '@angular/core/testing';

import { RegistrateService } from './registrate.service';

describe('RegistrateService', () => {
  let service: RegistrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
