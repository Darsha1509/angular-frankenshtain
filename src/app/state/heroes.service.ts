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

  setInitialState() {
    this.api
      .getHeroes()
      .pipe(take(1))
      .subscribe((heroes) => {
        const heroesWithId = heroes.map(
          (
            hero: { name: string; birth_year: string; gender: string },
            index
          ) => {
            return {
              id: index,
              name: hero.name,
              birth_year: hero.birth_year,
              gender: hero.gender,
            };
          }
        );
        this.heroesStore.set(heroesWithId);
      });
  }

  getPage(page: string): Observable<PaginationResponse<Hero>> {
    return this.api.getHeroesPagination(page).pipe(
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
}
