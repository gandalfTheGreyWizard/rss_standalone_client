import { TestBed } from '@angular/core/testing';

import { DynamicFormsHelper } from './dynamic-forms-helper';

describe('DynamicFormsHelper', () => {
  let service: DynamicFormsHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormsHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
