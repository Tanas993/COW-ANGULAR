import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { map, tap, BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://restcountries.com/v3.1';
  
  private selectedContinentSubject = new BehaviorSubject<string>('');
  selectedContinentAction$ = this.selectedContinentSubject.asObservable();

  private searchFilterSubject = new BehaviorSubject<string>('');
  searchFilterAction$ = this.searchFilterSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  allCountries$ = this.http.get<Country[]>(`${this.apiUrl}/all`).pipe(
    shareReplay(1)
  );

  continents$ = this.allCountries$.pipe(
    map(countries => countries.map(country => {
      return country.continents.join();
    })),
    map(country => [...new Set(country)]),
    shareReplay(1)
  );

  onSearchChange(countryName: string){
    this.searchFilterSubject.next(countryName);
  }

  onFiltered(continent: string){
    this.selectedContinentSubject.next(continent);
  };
}
