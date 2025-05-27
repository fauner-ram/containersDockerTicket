import { TestBed } from '@angular/core/testing';

import { InfoBoxeingService } from './info-boxeing.service';

describe('InfoBoxeingService', () => {
  let service: InfoBoxeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoBoxeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
