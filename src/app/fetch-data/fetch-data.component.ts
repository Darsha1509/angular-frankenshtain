import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
})
export class FetchDataComponent implements OnInit {
  input: FormControl;
  heroes: { name: string; birth_year: string; gender: string }[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.input = new FormControl();

    this.getInitialData();
  }

  private fetchData(url: string) {
    return this.http.get(url).pipe(
      map(
        (data: {
          results: { name: string; birth_year: string; gender: string }[];
        }) => {
          const peopleResult = data.results.map((person) => {
            return {
              name: person.name,
              birth_year: person.birth_year,
              gender: person.gender,
            };
          });
          return peopleResult;
        }
      )
    );
  }

  searchPerson() {
    this.fetchData(
      `https://swapi.dev/api/people/?search=${this.input.value}`
    ).subscribe((data) => {
      this.heroes = data;
    });
  }

  getInitialData() {
    this.fetchData('https://swapi.dev/api/people').subscribe((data) => {
      this.heroes = data;
    });
  }
}
