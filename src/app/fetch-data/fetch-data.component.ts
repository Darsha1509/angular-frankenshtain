import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  map,
  startWith,
  debounceTime,
  switchMap,
  shareReplay,
} from 'rxjs/operators';

import { HeroesService } from '../heros.service';

interface Hero {
  name: string;
  birth_year: string;
  gender: string;
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
  providers: [HeroesService],
})
export class FetchDataComponent implements OnInit {
  input: FormControl;

  users$: Observable<{}>;

  female$: Observable<Hero[]>;
  male$: Observable<Hero[]>;
  na$: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.input = new FormControl('');

    this.getData();
  }

  getData() {
    this.users$ = this.input.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap((search: string) => {
        return this.heroesService.getHeroes(search);
      }),
      map((data: { results: Hero[] }) =>
        data.results.map(({ name, birth_year, gender }) => {
          return {
            gender,
            birth_year,
            name,
          };
        })
      ),
      shareReplay(1)
    );

    this.female$ = this.users$.pipe(
      map((heroes: []) =>
        heroes.filter((hero: { gender: string }) => hero.gender === 'female')
      )
    );

    this.male$ = this.users$.pipe(
      map((heroes: []) =>
        heroes.filter((hero: { gender: string }) => hero.gender === 'male')
      )
    );

    this.na$ = this.users$.pipe(
      map((heroes: []) =>
        heroes.filter((hero: { gender: string }) => hero.gender === 'n/a')
      )
    );
  }
}
