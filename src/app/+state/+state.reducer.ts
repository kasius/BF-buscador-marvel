import { createReducer, on } from '@ngrx/store';
import * as authActions from './+state.actions';
import * as Model from './+state.models';

export const marvelFeatureKey = 'marvel';

export interface StateMavel {
  resources: any[];
  comics: any[];
  series: any[];
  stories: any[];
  category: string;
}

export const initialAuth: StateMavel = {
  resources: [],
  comics: [],
  series: [],
  stories: [],
  category: 'characters',
};

export const reducerMarvel = createReducer(
  initialAuth,

  // GET DATA MARVEl
  on(authActions.getMarvel, (state) => state),
  on(authActions.getMarvelSuccess, (state, payload) => ({
    ...state,
    resources: [...state.resources, ...payload.resources],
  })),
  on(authActions.getMarvelClearSuccess, (state, payload) => ({
    ...state,
    resources: [],
  })),
  on(authActions.getMarvelError, (state, payload) => ({
    ...state,
    error: payload.error,
  })),
  // GET DATA MARVEl

  // SET ITEM ID
  on(authActions.setItem, (state, payload) => ({
    ...state,
    comics: payload.setItem.comics ? payload.setItem.comics.items : [],
    series: payload.setItem.series ? payload.setItem.series.items : [],
    stories: payload.setItem.stories ? payload.setItem.stories.items : [],
  })),
  // SET ITEM ID

  // SET CATEGORY
  on(authActions.setCategory, (state, payload) => ({
    ...state,
    category: payload.category,
  }))
  // SET CATEGORY
);
