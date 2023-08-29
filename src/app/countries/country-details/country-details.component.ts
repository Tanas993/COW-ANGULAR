import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, shareReplay, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit{

  constructor(private apiService: ApiService, private route: ActivatedRoute, private routes: Router){}

  private countryParamSubject$ = new BehaviorSubject<string>('');
  countryParamAction$ = this.countryParamSubject$.asObservable();
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.countryParamSubject$.next(params['name']);
    })
  }

  selectedCountry$ = combineLatest([
    this.apiService.allCountries$,
    this.countryParamAction$
  ])
  .pipe(
    map(([countries, selCountry]) => 
      countries.filter(country => {
        return country.name.common.toLowerCase() === selCountry.toLowerCase();
      })
    ),
    map(country => country[0]),
    shareReplay(1)
  );

  borders$ = combineLatest([ 
    this.apiService.allCountries$,
    this.selectedCountry$
  ]).pipe(
    map(([allCountry, selCountry]) => {
      if(!selCountry.borders) return undefined;
      const fullBorderName:string[] = [];
      selCountry.borders.forEach(border => {
        const borderObj = allCountry.filter(data => {
          return (data.cca2 === border || data.cca3 === border || data.ccn3 === border || data.cioc === border);
        });

        const borderName: any = borderObj.map(border => {
          return border.name.common;
        });

        fullBorderName.push(borderName);
      });
      return fullBorderName;
    })
  );



  key$ = this.selectedCountry$.pipe(
    map(country =>country.currencies? country.currencies[Object.keys(country.currencies).join()]:undefined),
  );

  languages$ = this.selectedCountry$.pipe(
    map(country => country.languages? country.languages: undefined),
    map(lan => {
      const keys: string[] = [];
      const languages: string[] = [];
      for(let key in lan){
        keys.push(key);
      }
      keys.forEach(key => {
        lan? languages.push(lan[key]):undefined;
      })
      return languages.join(', ');
    })
  ); 

  onClickedBorder(border: string){
    this.routes.navigate([`../home/${border}`]);
  }
}
  

