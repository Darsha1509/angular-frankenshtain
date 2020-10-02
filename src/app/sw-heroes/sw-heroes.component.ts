import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  switchMap,
  map,
  merge,
  startWith,
  debounceTime,
  takeLast,
} from 'rxjs/operators';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroesQuery } from '../state/heroes.query';
import { HeroesState } from '../state/heroes.store';
import { HeroesService } from '../state/heroes.service';
import { HEROES_PAGINATOR } from '../state/heroes-paginator';

@Component({
  selector: 'app-sw-heroes',
  templateUrl: './sw-heroes.component.html',
  styleUrls: ['./sw-heroes.component.css'],
})
export class SwHeroesComponent implements OnInit {
  input: FormControl;
  pagination$: any;
  currentPage: BehaviorSubject<number>;

  constructor(
    @Inject(HEROES_PAGINATOR) public paginatorRef: PaginatorPlugin<HeroesState>,
    private heroesQuery: HeroesQuery,
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.input = new FormControl('');
    this.currentPage = new BehaviorSubject(1);

    this.currentPage.subscribe((data) => {
      this.location.go(`/?page=${data}`);
      this.paginatorRef.setPage(data);
    });

    this.location.onUrlChange((val) => {
      this.route.queryParamMap.subscribe((params) => {
        if (params.get('page')) {
          const pageParam = this.currentPage.value;
          this.pagination$ = this.paginatorRef.pageChanges.pipe(
            switchMap((page) => {
              const reqFn = () => this.heroesService.getPage(String(pageParam));

              return this.paginatorRef.getPage(reqFn);
            })
          );
        } else if (params.get('search')) {
          const searchParam = params.get('search');
          let hero = this.heroesQuery.selectEntity(searchParam);

          if (hero) {
            this.pagination$ = hero;
          } else {
            this.pagination$ = this.heroesService.getHero(searchParam);
          }
        }
      });
    });
  }

  goPrevPage() {
    this.currentPage.value !== 1 &&
      this.currentPage.next(this.currentPage.value - 1);
  }

  goToPage(page: number) {
    this.currentPage.next(page);
  }

  goNextPage() {
    this.currentPage.value !== 9 &&
      this.currentPage.next(this.currentPage.value + 1);
  }

  inputChange() {
    this.input.valueChanges.subscribe((value) => console.log(value));
  }
}
