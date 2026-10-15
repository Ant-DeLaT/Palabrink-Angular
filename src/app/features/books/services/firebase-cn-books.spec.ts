import { TestBed } from '@angular/core/testing';

import { FirebaseCnBooks } from './firebase-cn-books';

describe('FirebaseCnBooks', () => {
  let service: FirebaseCnBooks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCnBooks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
