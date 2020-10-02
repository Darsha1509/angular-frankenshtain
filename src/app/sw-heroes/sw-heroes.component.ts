import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, merge, startWith, debounceTime } from 'rxjs/operators';
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
  pagination$: Observable<PaginationResponse<HeroesState>>;
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
    // this.heroesService.setInitialState();
    // this.users$ = this.heroesQuery.getHeroes();
    this.currentPage = new BehaviorSubject(1);

    this.currentPage.subscribe((data) => {
      this.location.go(`/?page=${data}`);
      this.paginatorRef.setPage(data);
    });

    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      switchMap((page) => {
        const reqFn = () => this.heroesService.getPage(String(page));

        return this.paginatorRef.getPage(reqFn);
      })
    );
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
}
