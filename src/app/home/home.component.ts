import { Component } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  continents$ = this.apiService.continents$

  constructor(private apiService: ApiService){}

  onSearch(event: Event){
    const searchingCountry = (event.target as HTMLInputElement).value;
    this.apiService.onSearchChange(searchingCountry);
  }

  onFilter(event: Event) {
    const selectedContinent = (event.target as HTMLSelectElement).value;
    this.apiService.onFiltered(selectedContinent);
  }
}
