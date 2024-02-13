import { TestBed } from '@angular/core/testing';

import { EmpleadoDataService } from './empleado-data-service.service';

describe('EmpleadoDataServiceService', () => {
  let service: EmpleadoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
