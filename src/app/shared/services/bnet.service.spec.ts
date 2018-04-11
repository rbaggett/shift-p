import { TestBed, inject } from '@angular/core/testing';

import { BnetService } from './bnet.service';

describe('BnetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BnetService]
    });
  });

  it('should be created', inject([BnetService], (service: BnetService) => {
    expect(service).toBeTruthy();
  }));
});
