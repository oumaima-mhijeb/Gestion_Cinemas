import { TestBed } from '@angular/core/testing';

import { AdminCinemaService } from './admin-cinema.service';

describe('AdminCinemaService', () => {
  let service: AdminCinemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCinemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
