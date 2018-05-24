import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Array<string>> {
    return this.http.get<Array<string>>('../assets/countries.json').pipe(
      map(data => {
        return data['countries'];
      })
    );
  }
}
