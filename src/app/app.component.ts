import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  testFormGroup: FormGroup = new FormGroup({ country: new FormControl('') });
  countries: Array<string> = [];

  ngOnInit() {
    this.appService.getCountries().subscribe(data => (this.countries = data));
  }

  getFilteredSuggestions(filteredDataLst: Array<any>) {
    this.countries = [...filteredDataLst];
  }
}
