import { TestBed } from '@angular/core/testing';

import { RssParser } from './rss-parser';

describe('RssParser', () => {
  let service: RssParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssParser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
