import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { PaginatorPlugin } from '@datorama/akita';
import { ActivatedRoute, Router } from '@angular/router';
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
    private location: Location,
    private router1: Router
  ) {}

  ngOnInit(): void {
    this.input = new FormControl('');
    this.currentPage = new BehaviorSubject(1);

    this.input.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      val
        ? this.router1.navigate([], { queryParams: { search: val } })
        : this.router1.navigate([], {
            queryParams: { page: this.currentPage.value },
          });
    });

    this.currentPage.subscribe((data) => {
      this.router1.navigate([], { queryParams: { page: data } });
    });

    this.location.onUrlChange((val) => {
      this.route.queryParamMap.subscribe((params) => {
        if (params.get('page')) {
          const pageParam = this.currentPage.value;
          this.paginatorRef.setPage(pageParam);
          this.pagination$ = this.paginatorRef.pageChanges.pipe(
            switchMap((page) => {
              const reqFn = () => this.heroesService.getPage(String(pageParam));

              return this.paginatorRef.getPage(reqFn);
            })
          );
        } else if (params.get('search')) {
          const searchParam = params.get('search');

          this.pagination$ = this.heroesQuery.selectEntity(searchParam).pipe(
            switchMap((val) =>
              val
                ? of({ data: [val] })
                : this.heroesService.getHero(searchParam).pipe(
                    switchMap(() =>
                      this.heroesQuery.selectEntity(searchParam).pipe(
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
