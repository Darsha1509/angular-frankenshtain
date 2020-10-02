import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { HeroesStore, HeroesState } from './heroes.store';

import { Hero } from './hero.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesQuery extends QueryEntity<HeroesState> {
  constructor(protected store: HeroesStore) {
    super(store);
  }

  getHeroes(): Observable<Hero[]> {
    return this.selectAll();
  }

  getHero(param: string): Observable<Hero> {
    return this.selectEntity(param);
  }
}
