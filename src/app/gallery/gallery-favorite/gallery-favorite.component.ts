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
  styleUrls: ['./gallery-favorite.component.scss'],
})
export class GalleryFavoriteComponent implements OnInit {
  favoritelist$: Observable<any[]>;
  page: Page;
  currentPage: number;

  constructor(private service: GalleryService, private store: Store) {}

  ngOnInit() {
    const isEmpty = Object.keys(this.store.value.pageinfo).length === 0;
    if (!isEmpty) {
      this.favoritelist$ = this.store.getFavoriteList();
    }
  }

  onToggleItem(event: any) {
    this.service.toggleFavorite(event);
  }
}
