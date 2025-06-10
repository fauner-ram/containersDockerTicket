import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InfoBoxeingService } from './info-boxeing.service';

describe('InfoBoxeingService', () => {
  let service: InfoBoxeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InfoBoxeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
