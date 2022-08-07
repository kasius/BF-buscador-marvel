import { createAction, props } from '@ngrx/store';
import * as Model from './+state.models';

// MARVEL
export const getMarvel = createAction(
  '[GET data MARVEL] GET Data',
  props<{ filter: Model.Filter }>()
);

export const getMarvelSuccess = createAction(
  '[GET data MARVEL] GET Data Success',
  props<{ resources: Model.Marvel[] }>()
);

export const getMarvelClearSuccess = createAction(
  '[SET Clear data MARVEL] GET Data Success',
  props<{ resources: Model.Marvel[] }>()
);

export const getMarvelError = createAction(
  '[GET data MARVEL] GET Data Error',
  props<{ error: any }>()
);
// MARVEL

// SET ITEM
export const setItem = createAction(
  '[SET ITEM ID] SET Success',
  props<{ setItem: Model.Marvel }>()
);
// SET ITEM

// SET CATEGORY
export const setCategory = createAction(
  '[SET CATEGORY] SET Success',
  props<{ category: string }>()
);
// SET CATEGORY
