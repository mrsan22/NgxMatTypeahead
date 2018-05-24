import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { NgxMatTypeaheadService } from './ngx-mat-typeahead.service';

@Directive({
  selector: '[NgxMatTypeahead]'
})
export class NgxMatTypeaheadDirective {
  @Input() delayTime = 300;
  @Input() apiURL: string;
  @Input() urlParams: object = {};
  @Input() urlQueryParam = 'query';
  @Input() apiMethod = 'get';
  @Input() apiType = 'http';
  @Input() callbackFuncName: string;
  @Input() allowEmptyString = true;
  @Output() filteredDataList = new EventEmitter<Array<any>>();

  private onKeyUp$: Observable<KeyboardEvent>;

  constructor(private typeAheadService: NgxMatTypeaheadService) {}

  @HostListener('keyup', ['$event'])
  onkeyup(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.onKeyUp$ = of(event);
    this.showDataList(this.onKeyUp$);
  }

  private showDataList(keyUpEvent$: Observable<KeyboardEvent>) {
    keyUpEvent$
      .pipe(
        filter((e: KeyboardEvent) => this.typeAheadService.validateNonCharKeyCode(e.keyCode)),
        map(this.typeAheadService.extractFormValue),
        debounceTime(this.delayTime),
        distinctUntilChanged(),
        filter((searchTerm: string) => this.allowEmptyString || this.typeAheadService.emptyString(searchTerm)),
        switchMap((searchTerm: string): Observable<any> => this.filterData(searchTerm))
      )
      .subscribe((filteredList: Array<any>) => {
        this.filteredDataList.emit(filteredList);
      });
  }

  private filterData(searchTerm: string): Observable<any> {
    return this.typeAheadService.makeApiRequest(
      searchTerm,
      this.apiURL,
      this.urlQueryParam,
      this.urlParams,
      this.apiMethod,
      this.apiType,
      this.callbackFuncName
    );
  }
}
