import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { HeroesStore } from './heroes.store';
import { Hero } from './hero.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private heroesStore: HeroesStore, private http: HttpClient) {}

  get() {
    return this.http.get<any>('https://swapi.dev/api/people/').pipe(
      tap((response) => {
        this.heroesStore.set(response);
      })
    );
  }
}
