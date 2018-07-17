import { TestBed, inject } from '@angular/core/testing';

import { RpgService } from './rpg.service';

describe('RpgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RpgService]
    });
  });

  it('should be created', inject([RpgService], (service: RpgService) => {
    expect(service).toBeTruthy();
  }));
});
