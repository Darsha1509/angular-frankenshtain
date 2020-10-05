import { Injectable } from '@angular/core';
import { HeroesStore } from './heroes.store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@datorama/akita';
import { ID } from '@datorama/akita';

import { HeroesApiService } from './heroes-api.service';
import { Hero } from './hero.model';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(
    private heroesStore: HeroesStore,
    private api: HeroesApiService
  ) {}

  getPage(page: string): Observable<PaginationResponse<Hero>> {
    return this.api.getPage(page).pipe(
      map((response: { count: number; results: [] }) => {
        let heroes = response.results.map((hero: Hero) => {
          return {
            id: hero.name,
            name: hero.name,
            gender: hero.gender,
            birth_year: hero.birth_year,
          };
        });

        return {
          currentPage: +page,
          perPage: 10,
          lastPage: Math.ceil(response.count / 10),
          data: heroes,
        };
      }),
      take(1)
    );
  }

  getHero(search: string): Observable<Hero> {
    return this.api.getHero(search).pipe(
      map((res) => {
        let searchedHero = {
          id: res.results[0].name,
          name: res.results[0].name,
          gender: res.results[0].gender,
          birth_year: res.results[0].birth_year,
        };
        this.heroesStore.add(searchedHero);
        return searchedHero;
      })
    );
  }
}
