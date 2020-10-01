import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from './hero.model';

@Injectable({ providedIn: 'root' })
export class HeroesApiService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get('https://swapi.dev/api/people/').pipe(
      map((response: { results: Hero[] }) => {
        return response.results.map((hero, index) => {
          return {
            id: index,
            name: hero.name,
            gender: hero.gender,
            birth_year: hero.birth_year,
          };
        });
      })
    );
  }
}
