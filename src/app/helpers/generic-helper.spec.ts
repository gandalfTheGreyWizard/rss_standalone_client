import { TestBed } from '@angular/core/testing';

import { GenericHelper } from './generic-helper';

describe('GenericHelper', () => {
  let service: GenericHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
