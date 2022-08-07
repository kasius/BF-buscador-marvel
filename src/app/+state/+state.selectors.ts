import { createSelector } from '@ngrx/store';
import * as fromMarvel from './+state.reducer';

// eslint-disable-next-line no-prototype-builtins
const selectState = (state: any) =>
  state.hasOwnProperty(fromMarvel.marvelFeatureKey)
    ? state[fromMarvel.marvelFeatureKey]
    : '';

export const getMarvel = createSelector(selectState, (state: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return state.hasOwnProperty('resources') ? state.resources : '';
});

export const getMarvelItem = createSelector(selectState, (state: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return state.hasOwnProperty('comics') ? state.comics : '';
});

export const getMarvelItemSeries = createSelector(selectState, (state: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return state.hasOwnProperty('series') ? state.series : '';
});

export const getMarvelItemStories = createSelector(
  selectState,
  (state: any) => {
    // eslint-disable-next-line no-prototype-builtins
    return state.hasOwnProperty('stories') ? state.stories : '';
  }
);

export const getCategory = createSelector(selectState, (state: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return state.hasOwnProperty('category') ? state.category : '';
});
