import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxMatTypeaheadDirective } from './ngx-mat-typeahead.directive';
import { NgxMatTypeaheadService } from './ngx-mat-typeahead.service';

let typeaheadService: NgxMatTypeaheadService;
let directiveInstance: NgxMatTypeaheadDirective;

describe('NgxMatTypeaheadDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxMatTypeaheadDirective],
      imports: [HttpClientTestingModule],
      providers: [NgxMatTypeaheadService]
    });
    directiveInstance = new NgxMatTypeaheadDirective(typeaheadService);
    typeaheadService = TestBed.get(NgxMatTypeaheadService);
  });
  it('should create an instance', () => {
    const directive = new NgxMatTypeaheadDirective(typeaheadService);
    expect(directive).toBeTruthy();
  });
});
describe('Default Inputs', () => {
  it('should have default value for delayTime Input variable', () => {
    expect(directiveInstance.delayTime).toBe(300);
  });
  it('should have default value for urlParams Input variable', () => {
    expect(directiveInstance.urlParams).toEqual({});
  });
  it('should have default value for urlQueryParam Input variable', () => {
    expect(directiveInstance.urlQueryParam).toBe('query');
  });
  it('should have default value for apiMethod Input variable', () => {
    expect(directiveInstance.apiMethod).toBe('get');
  });
  it('should have default value for apiType Input variable', () => {
    expect(directiveInstance.apiType).toBe('http');
  });
  it('should have default value for allowEmptyString Input variable', () => {
    expect(directiveInstance.allowEmptyString).toBe(true);
  });
});
