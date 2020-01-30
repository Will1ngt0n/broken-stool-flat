import { TestBed, async, inject } from '@angular/core/testing';

import { ReverseAuthGuardGuard } from './reverse-auth-guard.guard';

describe('ReverseAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseAuthGuardGuard]
    });
  });

  it('should ...', inject([ReverseAuthGuardGuard], (guard: ReverseAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
