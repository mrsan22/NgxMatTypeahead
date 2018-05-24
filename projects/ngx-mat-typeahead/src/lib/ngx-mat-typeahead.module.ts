import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxMatTypeaheadDirective } from './ngx-mat-typeahead.directive';

@NgModule({
  imports: [HttpClientModule],
  declarations: [NgxMatTypeaheadDirective],
  exports: [NgxMatTypeaheadDirective]
})
export class NgxMatTypeaheadModule {}
