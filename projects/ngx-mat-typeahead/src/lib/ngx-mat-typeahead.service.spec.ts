import { TestBed, inject } from '@angular/core/testing';

import { NgxMatTypeaheadService } from './ngx-mat-typeahead.service';

describe('NgxMatTypeaheadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxMatTypeaheadService]
    });
  });

  it('should be created', inject([NgxMatTypeaheadService], (service: NgxMatTypeaheadService) => {
    expect(service).toBeTruthy();
  }));
});
