import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import {
  routerReducer,
  RouterState,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './components/item/item.component';
import { DetailComponent } from './components/detail/detail.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { environment } from 'src/environments/environment';
import { MarvelEffects } from './+state/+state.effects';
import * as fromMarvel from './+state/+state.reducer';
import { MarvelFacade } from './+state/+state.facade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const reducers: ActionReducerMap<any> = { routerReducer };

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['marvel'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent, DetailComponent, HomeComponent, ItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
    ]),
    StoreModule.forRoot(
      { router: routerReducer },
      {
        metaReducers: metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    EffectsModule.forFeature([MarvelEffects]),
    StoreModule.forFeature(
      fromMarvel.marvelFeatureKey,
      fromMarvel.reducerMarvel
    ),
  ],
  providers: [MarvelFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
