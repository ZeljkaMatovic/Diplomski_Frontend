import { TestBed } from '@angular/core/testing';

import { IsruGuard } from './isru.guard';

describe('IsruGuard', () => {
  let guard: IsruGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsruGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
