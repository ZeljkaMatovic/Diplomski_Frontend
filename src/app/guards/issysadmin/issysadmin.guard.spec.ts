import { TestBed } from '@angular/core/testing';

import { IssysadminGuard } from './issysadmin.guard';

describe('IssysadminGuard', () => {
  let guard: IssysadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IssysadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
