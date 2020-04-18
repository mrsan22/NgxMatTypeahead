import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Local import from projects/ngx-mat-typeahead.
import { NgxMatTypeaheadModule } from 'NgxMatTypeahead';
// Import from node_modules.
// import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead';
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
    NgxMatTypeaheadModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
