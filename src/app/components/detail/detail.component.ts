import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { MarvelFacade } from 'src/app/+state/+state.facade';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  // declarations
  public marvelDataItem$: any = of();
  public marvelDataItemSeries$: any = of();
  public marvelDataItemStories$: any = of();

  constructor(private marvelFacade: MarvelFacade) {
    this.marvelDataItem$ = marvelFacade.getMarvelItem$();
    this.marvelDataItemSeries$ = marvelFacade.getMarvelItemSeries$();
    this.marvelDataItemStories$ = marvelFacade.getMarvelItemStories$();
  }

  ngOnInit(): void {}
}
