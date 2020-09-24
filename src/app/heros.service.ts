import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http.get('https://swapi.dev/api/people');
  }

  searchHeroes(searchParam: string) {
    return this.http.get(`https://swapi.dev/api/people/?search=${searchParam}`);
  }
}