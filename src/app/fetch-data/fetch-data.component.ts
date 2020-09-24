import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { map, startWith, debounceTime, switchMap, shareReplay } from 'rxjs/operators';

import { HeroesService } from '../heros.service';

interface Hero { name: string; birth_year: string; gender: string; };

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
  providers: [HeroesService]
})
export class FetchDataComponent implements OnInit {
  input: FormControl;
  males: Hero[];
  females: Hero[];
  undefs: Hero[];

  users$: Observable<{}>;
  
  female$: Observable<Hero[]>;
  male$: Observable<Hero[]>;
  na$: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.input = new FormControl();

    // this.getInitialData();

    this.users$ = this.input.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap((search: string) => {
          if (search) {
            this.heroesService.getHeroes();
          } else {
            this.heroesService.searchHeroes(search);
          }
        }),
        map((data: { results: Hero[]}) => data.results.map(({ name, birth_year, gender }) => {
          return {
            gender,
            birth_year,
            name
          }
        })),
        shareReplay(1)
      );

      console.log(this.users$);
  }



  // private fetchData(url: string) {
  //   return this.http.get(url).pipe(
  //     map(
  //       (data: {
  //         results: { name: string; birth_year: string; gender: string }[];
  //       }) => {
  //         const resultData: { 
  //           male: { name: string; birth_year: string; gender: string }[]; 
  //           female: { name: string; birth_year: string; gender: string }[]; 
  //           undef: { name: string; birth_year: string; gender: string }[] 
  //         } = { 
  //           male: [], 
  //           female: [], 
  //           undef: [] 
  //         };

  //         data.results.map((person) => {
  //           person.gender === 'male' ? resultData.male.push(person) : null;
  //           person.gender === 'female' ? resultData.female.push(person) : null;
  //           person.gender === 'n/a' ? resultData.undef.push(person) : null;
  //         });

  //         return resultData;
  //       }
  //     ),
  //     take(1)
  //   );
  // }

  // searchPerson() {
  //   this.fetchData(
  //     `https://swapi.dev/api/people/?search=${this.input.value}`
  //   )
  //   .subscribe((data) => {
  //     this.sortHeroes(data);
  //   });
  // }

  // getInitialData() {
  //   this.fetchData('https://swapi.dev/api/people')
  //   .subscribe((data) => {
  //     this.sortHeroes(data);
  //   });
  // }

  // private sortHeroes(data: { 
  //   male: { name: string; birth_year: string; gender: string }[]; 
  //   female: { name: string; birth_year: string; gender: string }[]; 
  //   undef: { name: string; birth_year: string; gender: string }[]}) {
  //   this.males = data.male;
  //   this.females = data.female;
  //   this.undefs = data.undef;
  // }
}
