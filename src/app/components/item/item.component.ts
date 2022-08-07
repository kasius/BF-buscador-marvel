import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MarvelFacade } from 'src/app/+state/+state.facade';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  // declarations
  @Input() item: any;

  constructor(private marvelFacade: MarvelFacade) {}

  ngOnInit(): void {}

  getImg(item: any): string {
    return item.thumbnail ? `${item.thumbnail.path}.jpg` : '';
  }

  setItem(item: any) {
    this.marvelFacade.setItemId(item);
  }
}
