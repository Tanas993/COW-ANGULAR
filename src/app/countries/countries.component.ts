import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { combineLatest, map, shareReplay, tap } from 'rxjs';
import { Country } from '../models/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  constructor(private apiService: ApiService){}

  selectedContinent$ = this.apiService.selectedContinentAction$;
  searchInput$ = this.apiService.searchFilterAction$;

  //Getting all countrties and sorting them from A to Z.
  countries$ = this.apiService.allCountries$.pipe(
    map(countries => countries.sort(this.sortByName)),
    shareReplay(1)
  );
  
  //Showing countries based on selected continent and/or search filter.
  countriesToShow$ = combineLatest([
    this.countries$,
    this.selectedContinent$,
    this.searchInput$
  ]).pipe(
    map(([countries, selectedContinent, searchQuery]) =>
      countries.filter(country =>
        (searchQuery !== ''? country.name.common.toLowerCase().includes(searchQuery.toLowerCase()):country) &&
        (selectedContinent !== ''? country.continents.join(',') === selectedContinent : country )
      ),
    ),
  );

  sortByName(a:Country, b:Country){
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  }
}


