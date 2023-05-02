import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchByAlphaCode( id )),
      )
      .subscribe( country => {
        if( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      });
      // Demasiado desmadre por eso se cambio al pipe y demas
      // .subscribe( ({ id }) => {

      //   this.countriesService.searchByAlphaCode( id )
      //     .subscribe( country => {
      //       console.log(country);
      //     });

      // });
  }

}
