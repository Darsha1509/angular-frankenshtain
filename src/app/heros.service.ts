import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes(searchParam: string) {
    return searchParam
      ? this.http.get('https://swapi.dev/api/people/')
      : this.http.get(`https://swapi.dev/api/people/?search=${searchParam}`);
  }
}
