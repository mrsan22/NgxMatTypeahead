import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxMatTypeaheadDirective } from './ngx-mat-typeahead.directive';
import { NgxMatTypeaheadService } from './ngx-mat-typeahead.service';

describe('NgxMatTypeaheadDirective', () => {
  let typeaheadService: NgxMatTypeaheadService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NgxMatTypeaheadService]
    });
    typeaheadService = TestBed.get(NgxMatTypeaheadService);
  });
  it('should create an instance', () => {
    const directive = new NgxMatTypeaheadDirective(typeaheadService);
    expect(directive).toBeTruthy();
  });
});
