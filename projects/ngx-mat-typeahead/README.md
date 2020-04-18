# NgxMatTypeahead

**Update**: This library is Ivy Compatible and is tested against an Angular 9 app. (check example in angular_v9 branch)

* A simple typeahead `directive` to be used with Angular Material input and matAutocomplete component.
* This directives enhances the funtionality of Angular Material `matAutocomplete` component and is recommended that it is used with it.
* However, this directive can be used with `any other` autocomplete component.
* It is developed using `Angular >=6.0.0` and its newly introduced `ng g library` schematics.
* This library is part of MatTypeahead project and it is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.
* Library location: `projects/ngx-mat-typeahead` directory of this repository.

## Examples/Demo

* A simple Example can be found under `src/app` directory of this repository. It uses `json-server` to have a url and filter functionality.

## Installation

`npm i ngx-mat-typeahead`

## API

`import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead'`<br>
`selector: NgxMatTypeahead`

### @Inputs()

| Input            | Type    | Required                   | Description                                                                                               |
| ---------------- | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| apiURL           | string  | **YES**                    | the url of a remote server that supports http/jsonp calls.                                                |
| delayTime        | number  | Optional, default: 300     | the debounce time for this request.                                                                       |
| urlParams        | object  | Optional, default: {}      | { key: string, value: any} object as additional parameters                                                |
| urlQueryParam    | string  | Optional, default: 'query' | a string value which is used a query parameter in the url. Ex: `http://localhost:3000/countries?query='c` |
| apiMethod        | string  | Optional, default: 'get'   | the http/jsonp method to be used.                                                                         |
| apiType          | string  | Optional, default: 'http'  | http or jsonp method types.                                                                               |
| callbackFuncName | string  | Optional                   | a string value for the callback query parameter.                                                          |
| allowEmptyString | boolean | Optional, default: true    | if true, it allows empty strings to pass and invoke search                                                |

### @Outputs()

| Output           | Type       | Required | Description                                            |
| ---------------- | ---------- | -------- | ------------------------------------------------------ |
| filteredDataList | Array<any> | **YES**  | emits filtered data list depending on the search term. |

## Usage

1) Register the `NgxMatTypeaheadModule` in your app module.
 > `import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead'`

 ```typescript
 import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgxMatTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 ```

 2) Use the directive `(NgxMatTypeahead)` in your component.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
@Component({
  selector: 'mat-ta-root',
  template: `<h3>NgxMatTypeahead demo app using Angular Material</h3>
<div [formGroup]="testFormGroup">
  <mat-form-field>
    <input matInput NgxMatTypeahead [apiURL]="url" [urlQueryParam]="queryParam" (filteredDataList)="getFilteredSuggestions($event)"
      formControlName="country" [matAutocomplete]="countryAuto" placeholder="Choose Country">
    <mat-autocomplete #countryAuto="matAutocomplete">
      <mat-option *ngFor="let country of countries" [value]="country">
        {{country}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
</div>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Paramteres for the input type are defined below. The url is generated using `json-server`.
  // Please run your own instance of the json-server to use the the below url.
  queryParam = 'q';
  url = 'http://localhost:3000/countries';

  constructor(private appService: AppService) {}

  testFormGroup: FormGroup = new FormGroup({ country: new FormControl('') });
  countries: Array<string> = [];

  ngOnInit() {
    this.countries = ["United States", "United Kingdom", "China", "Japan", "India", "Russia", "Canada", "Brazil"];
  }

  getFilteredSuggestions(filteredDataLst: Array<any>) {
    this.countries = [...filteredDataLst];
  }
}
```

## Running the example in local env

* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* The demo app uses `json-server` module for enabling the url and filter funtionality. Make sure you have [json-server](https://www.npmjs.com/package/json-server#getting-started) installed and running.
* Once you have installed json-server, Run: `json-server --watch db.json`. You can see it running at `http://localhost:3000`.

## Build the NgxMatTypeahead module

Run `ng build NgxMatTypeahead` to build the library. The build artifacts will be stored in the `dist/ngx-mat-typeahead` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test NgxMatTypeahead` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Credits

This project is based on [ngx-typeahead](https://github.com/orizens/ngx-typeahead). I want to thank Oren Farhi from [Orizens](http://orizens.com) for open sourcing his project as it helped me to write my first simple Angular library. Also want to thanks entire [Angular](https://angular.io) team for creating this awesome framework.
