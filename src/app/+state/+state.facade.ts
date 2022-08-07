import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as marvelActions from './+state.actions';
import * as marvelSelectors from './+state.selectors';
import * as Model from './+state.models';

@Injectable()
export class MarvelFacade {
  constructor(private store: Store<Model.Marvel>) {}

  // MARVEL DATA
  public getMarvel(filter: any) {
    this.store.dispatch(marvelActions.getMarvel(filter));
  }

  public getMarvelClearSuccess() {
    this.store.dispatch(marvelActions.getMarvelClearSuccess({ resources: [] }));
  }

  public getMarvel$(): Observable<Model.Marvel> {
    return this.store.select(marvelSelectors.getMarvel);
  }
  // MARVEL DATA

  // SET ITEM ID
  public setItemId(setItem: any) {
    this.store.dispatch(marvelActions.setItem({ setItem }));
  }

  public getMarvelItem$(): Observable<Model.Marvel> {
    return this.store.select(marvelSelectors.getMarvelItem);
  }

  public getMarvelItemSeries$(): Observable<Model.Marvel> {
    return this.store.select(marvelSelectors.getMarvelItemSeries);
  }

  public getMarvelItemStories$(): Observable<Model.Marvel> {
    return this.store.select(marvelSelectors.getMarvelItemStories);
  }
  // SET ITEM ID

  // SET CATEGORY
  public setCategory(category: string) {
    this.store.dispatch(marvelActions.setCategory({ category }));
  }

  public getCategory$(): Observable<string> {
    return this.store.select(marvelSelectors.getCategory);
  }
  // SET CATEGORY
}
