import { TestBed } from '@angular/core/testing';

import { TrickerWsService } from './tricker-ws.service';

describe('TrickerWsService', () => {
  let service: TrickerWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrickerWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
