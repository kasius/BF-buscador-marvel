import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { MarvelFacade } from 'src/app/+state/+state.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  // declarations
  public category = 'characters';
  public marvelData$: any = of();
  private di$: Subject<boolean> = new Subject();
  public searchDebounce = '';
  public searchDebounceUpdate = new Subject<string>();
  public categories = [
    { label: 'Personaje', value: 'CHARACTERS', filter: 'characters' },
    { label: 'Películas', value: 'VIDEOS', filter: 'series' },
    { label: 'Historietas', value: 'COMICS', filter: 'comics' },
  ];

  constructor(private marvelfacade: MarvelFacade) {
    this.processRequest();
  }

  ngOnInit(): void {
    this.marvelData$ = this.marvelfacade.getMarvel$();
    this.searchDebounceUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.filterQueryString();
      });

    this.marvelfacade
      .getCategory$()
      .pipe(takeUntil(this.di$))
      .subscribe((category) => {
        this.category = category;
      });
  }

  ngOnDestroy(): void {
    this.di$.next(true);
    this.di$.complete();
  }

  filterQueryString() {
    this.marvelfacade.setCategory(this.category);
    this.marvelfacade.getMarvelClearSuccess();
    this.processRequest();
  }

  processRequest(): void {
    switch (true) {
      case this.category === 'ALL':
        // gatillamos todas las categorías
        this.categories.forEach((item) =>
          this.marvelfacade.getMarvel({
            category: item.filter,
            query:
              this.searchDebounce.length > 0
                ? `&nameStartsWith=${this.searchDebounce}`
                : '',
          })
        );
        break;
      case this.category !== 'ALL':
        // gatillamos solo la categoría seleccionada
        switch (true) {
          case this.category === 'series':
            this.marvelfacade.getMarvel({
              category: this.category,
              query:
                this.searchDebounce.length > 0
                  ? `&titleStartsWith=${this.searchDebounce.toLowerCase()}`
                  : '',
            });
            break;
          case this.category === 'characters':
            this.marvelfacade.getMarvel({
              category: this.category,
              query:
                this.searchDebounce.length > 0
                  ? `&nameStartsWith=${this.searchDebounce.toLowerCase()}`
                  : '',
            });
            break;
          case this.category === 'comics':
            this.marvelfacade.getMarvel({
              category: this.category,
              query:
                this.searchDebounce.length > 0
                  ? `&titleStartsWith=${this.searchDebounce.toLowerCase()}`
                  : '',
            });
            break;
        }
        break;
    }
  }
}
