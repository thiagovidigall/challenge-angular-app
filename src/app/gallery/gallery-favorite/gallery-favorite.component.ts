import {
  Component,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { Page } from '../models/character';
import { GalleryService } from '../service/gallery.service';
import { Store } from '../service/gallery.store';

@Component({
  selector: 'app-gallery-favorite',
  templateUrl: './gallery-favorite.component.html',
  styleUrls: ['./gallery-favorite.component.css']
})
export class GalleryFavoriteComponent implements OnInit{
  favoritelist$: Observable<any[]>;
  page: Page
  currentPage: number

  constructor(private service: GalleryService, private store: Store) {}

  ngOnInit() {
    const isEmpty = Object.keys(this.store.value.pageinfo).length === 0;
    if(!isEmpty) {
      this.favoritelist$ = this.store.getFavoriteList();
    }  
  }

  onToggleItem(event: any) {
    // this.store.getPageInfo().subscribe(next => this.page = next);
    // this.store.getCurrentPage().subscribe(next => this.currentPage = next);
    this.service.toggleFavorite(event);
  }

}
