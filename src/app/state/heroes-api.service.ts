import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, mapTo, take } from 'rxjs/operators';

import { Hero } from './hero.model';

@Injectable({ providedIn: 'root' })
export class HeroesApiService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get('https://swapi.dev/api/people/').pipe(
      map((res: { results: [] }, i) => {
        return res.results;
      })
    );
  }

  getHeroesPagination(page: string) {
    return this.http.get<any>(`https://swapi.dev/api/people/?page=${page}`);
  }
}
