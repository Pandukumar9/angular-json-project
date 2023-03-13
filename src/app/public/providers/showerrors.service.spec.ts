import { TestBed } from '@angular/core/testing';

import { ShowerrorsService } from './showerrors.service';

describe('ShowerrorsService', () => {
  let service: ShowerrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowerrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
