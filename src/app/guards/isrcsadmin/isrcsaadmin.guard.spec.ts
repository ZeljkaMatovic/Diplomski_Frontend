import { TestBed } from '@angular/core/testing';

import { IsrcsaadminGuard } from './isrcsaadmin.guard';

describe('IsrcsaadminGuard', () => {
  let guard: IsrcsaadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsrcsaadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
