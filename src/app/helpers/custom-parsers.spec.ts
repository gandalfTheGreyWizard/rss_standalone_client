import { TestBed } from '@angular/core/testing';

import { CustomParsers } from './custom-parsers';

describe('CustomParsers', () => {
  let service: CustomParsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomParsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
