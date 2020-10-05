import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import {
  switchMap,
  map,
  debounceTime,
  startWith,
  filter,
  tap,
} from 'rxjs/operators';
import { PaginatorPlugin } from '@datorama/akita';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
    private router1: Router
  ) {}

  ngOnInit(): void {
    this.input = new FormControl('');
    this.currentPage = new BehaviorSubject(1);

    this.currentPage.subscribe((data) => {
      this.router1.navigate([], { queryParams: { page: data } });
    });

    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      switchMap((page) => {
        const reqFn = () => this.heroesService.getPage(String(page));

        return this.paginatorRef.getPage(reqFn);
      })
    );

    this.input.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      val
        ? this.router1.navigate([], { queryParams: { search: val } })
        : this.router1.navigate([], {
            queryParams: { page: this.currentPage.value },
          });
    });

    this.route.queryParams
      .pipe(startWith({ page: '1' }))
      .subscribe((p: { page: string; search: string }) => {
        if (p.page) {
          this.paginatorRef.setPage(+p.page);
        } else if (p.search) {
          const searchParam = p.search;

          this.pagination$ = this.heroesQuery.getHeroes().pipe(
            map((heroes) => {
              const hero = heroes.find(
                (hero) => hero.id.search(new RegExp(searchParam)) >= 0
              );
              return hero;
            }),
            switchMap((val) =>
              val
                ? of({ data: [val] })
                : this.heroesService.getHero(searchParam).pipe(
                    switchMap((res) =>
                      this.heroesQuery.selectEntity(res.name).pipe(
                        map((val) => {
                          return { data: [val] };
                        })
                      )
                    )
                  )
            )
          );
        }
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
}
