import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Key, validHttpMethods } from './ngx-mat-typeahead-util';

@Injectable({
  providedIn: 'root'
})
export class NgxMatTypeaheadService {
  constructor(private http: HttpClient) {}
  /**
   * Extract the characters typed in the input of the typeahead component.
   */
  extractFormValue(event: KeyboardEvent): string {
    return event['target']['value'];
  }

  emptyString(inputSearchTerm: string): boolean {
    return inputSearchTerm.length > 0;
  }

  isEscapeKey(event: KeyboardEvent): boolean {
    return event.keyCode === Key.Escape;
  }

  validateNonCharKeyCode(keyCode: number): boolean {
    return [Key.Enter, Key.Tab, Key.Shift, Key.ArrowLeft, Key.ArrowUp, Key.ArrowRight, Key.ArrowDown].every(
      codeKey => codeKey !== keyCode
    );
  }

  makeApiRequest(
    searchTerm: string,
    apiURL: string,
    urlQueryParam: string,
    urlParams: object,
    apiMethod: string,
    apiType: string,
    callbackFuncName: string
  ): Observable<any> {
    const options = { params: this.configureParams(searchTerm, urlQueryParam, urlParams) };
    const validApiMethod = this.checkApiMethod(apiMethod);
    return apiType === 'http'
      ? this.requestHttpCall(apiURL, validApiMethod, options)
      : this.requestJsonpCall(apiURL, options, callbackFuncName);
  }

  private configureParams(searchTerm: string, urlQueryParam: string, urlParams: object): HttpParams {
    const searchParams = {
      [urlQueryParam]: searchTerm,
      ...urlParams
    };
    let Params = new HttpParams();
    for (const eachKey of Object.keys(searchParams)) {
      Params = Params.append(eachKey, searchParams[eachKey]);
    }
    return Params;
  }

  private checkApiMethod(apiMethod: string): string {
    const validHttpMethodsArray: Array<string> = [
      validHttpMethods.GET,
      validHttpMethods.POST,
      validHttpMethods.PUT,
      validHttpMethods.PATCH,
      validHttpMethods.DELETE,
      validHttpMethods.REQUEST
    ];
    return validHttpMethodsArray.indexOf(apiMethod) !== -1 ? apiMethod : 'get';
  }

  private requestHttpCall(url: string, validApiMethod: string, options: { params: HttpParams }): Observable<any> {
    return this.http[validApiMethod](url, options);
  }

  private requestJsonpCall(
    url: string,
    options: { params: HttpParams },
    callbackFuncName = 'defaultCallback'
  ): Observable<any> {
    const params = options.params.toString();
    return this.http
      .jsonp(`${url}?${params}`, callbackFuncName)
      .pipe(map(this.toJsonpSingleResult), map(this.toJsonpFinalResults));
  }

  private toJsonpSingleResult(response: any) {
    return response[1];
  }

  private toJsonpFinalResults(results: any[]) {
    return results.map((result: any) => result[0]);
  }
}
