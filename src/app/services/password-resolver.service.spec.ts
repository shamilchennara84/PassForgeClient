import { TestBed } from '@angular/core/testing';

import { PasswordResolverService } from './password-resolver.service';

describe('PasswordResolverService', () => {
  let service: PasswordResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
