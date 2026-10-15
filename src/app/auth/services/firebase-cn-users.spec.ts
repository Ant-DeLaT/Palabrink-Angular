import { TestBed } from '@angular/core/testing';

import { FirebaseCnUsers } from './firebase-cn-users';

describe('FirebaseCnUsers', () => {
  let service: FirebaseCnUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCnUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
