import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { NgxMatTypeaheadService } from './ngx-mat-typeahead.service';

let injector: TestBed;
let ngxTypeaheadService: NgxMatTypeaheadService;
let httpMock: HttpTestingController;

describe('NgxMatTypeaheadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NgxMatTypeaheadService]
    });
    injector = getTestBed();
    ngxTypeaheadService = injector.get(NgxMatTypeaheadService);
    httpMock = injector.get(HttpClientTestingModule);
  });

  it(
    'should be created',
    inject([NgxMatTypeaheadService], (service: NgxMatTypeaheadService) => {
      expect(service).toBeTruthy();
    })
  );
});

describe('Test makeApiRequest method', () => {
  const dummyArgs = {
    searchTerm: 'c',
    apiURL: '../assets/countries.json',
    urlQueryParam: 'q',
    urlParams: {},
    apiMethod: 'get',
    apiType: 'http',
    callbackFuncName: 'jsonp_callback'
  };
  it('should return Observable<any>', () => {
    spyOn<any>(ngxTypeaheadService, 'configureParams').and.callThrough();
    spyOn<any>(ngxTypeaheadService, 'checkApiMethod').and.callThrough();
    spyOn<any>(ngxTypeaheadService, 'requestJsonpCall').and.callThrough();
    ngxTypeaheadService
      .makeApiRequest(
        dummyArgs.searchTerm,
        dummyArgs.apiURL,
        dummyArgs.urlQueryParam,
        dummyArgs.urlParams,
        dummyArgs.apiMethod,
        dummyArgs.apiType,
        dummyArgs.callbackFuncName
      )
      .subscribe(data => expect(data.length).toBe(8));
  });
});

describe('Test typeahead service util methods', () => {
  it('should return the character from the keyboard event', () => {
    const dummyEvent: KeyboardEvent = {
      code: 'a',
      target: {
        value: 'a'
      },
      altKey: 'a',
      char: 'a',
      charCode: 'a'
    };
    expect(ngxTypeaheadService.extractFormValue(dummyEvent)).toBe('a');
  });
  it('should return true if non empty string is passed', () => {
    expect(ngxTypeaheadService.emptyString('abc')).toBeTruthy();
  });
  it('should return false empty string is passed', () => {
    expect(ngxTypeaheadService.emptyString('')).toBeFalsy();
  });
  it('should return true if non char keycode is passed', () => {
    const aKeycode = 65;
    const enterKeyCode = 13;
    expect(ngxTypeaheadService.validateNonCharKeyCode(aKeycode)).toBeTruthy();
    expect(ngxTypeaheadService.validateNonCharKeyCode(enterKeyCode)).toBeFalsy();
  });
});
