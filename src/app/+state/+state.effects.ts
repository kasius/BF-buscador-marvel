import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Model from './+state.models';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as marvelActions from './+state.actions';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarvelEffects {
  // declarations

  constructor(private actions$: Actions, private http: HttpClient) {}

  getMarvel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(marvelActions.getMarvel),
      concatMap((filter: any) =>
        this.http
          .get(
            `${environment.marvelApi}${filter.category}${environment.marvelApiKeys}${filter.query}&limit=50`
          )
          .pipe(
            map((res: any) =>
              marvelActions.getMarvelSuccess({ resources: res.data.results })
            ),
            catchError((err) =>
              of(marvelActions.getMarvelError({ error: err }))
            )
          )
      )
    )
  );
}
