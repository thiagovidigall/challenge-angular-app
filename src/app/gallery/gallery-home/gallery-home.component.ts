import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  Character,
  Page,
} from '../models/character';
import { GalleryService } from '../service/gallery.service';
import { Store } from '../service/gallery.store';

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss'],
})
export class GalleryHomeComponent implements OnInit, OnDestroy {

  // characterschema$: Observable<any>;
  characterslist$: Observable<any[]>;
  // subscription: Subscription;

  pageResults: Character[];
  pageInfo: Page;

  currentPage = 0;
  nextPage = 1;
  pageTotalItems = 0;
  pageSize = 20;

  searchText = '';

  constructor(private service: GalleryService, private store: Store) {}

  ngOnInit() {
    this.initStore();
  }

  initStore() {
    const isEmpty = Object.keys(this.store.value.pageinfo).length === 0;
    if (isEmpty) {
      this.getAllByService();
    } else {
      this.getAllByStore();
    }
  }

  handlePageChange(nextPage: number): void {
    this.nextPage = nextPage;
    this.getAllByService();
  }

  getAllByService() {
    this.service.getAllCharacters(`?name=${this.searchText}&page=${this.nextPage}`,this.nextPage).subscribe({
      next: (data) => {
        const { results, info } = data;
        this.pageInfo = info;
        this.pageResults = results;

        this.pageTotalItems = info.count;
        this.currentPage = this.nextPage;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllByStore() {
    this.getCharactersByStore();
    this.getPageByStore();
    this.getCurrentPageByStore();
  }

  getCharactersByStore() {
    this.store
      .getCharacterList()
      .subscribe({ next: (data) => (this.pageResults = data) });
  }

  getPageByStore() {
    this.store.getPageInfo().subscribe({
      next: (data) => {
        this.pageInfo = data;
        this.pageTotalItems = data.count;
      },
    });
  }

  getCurrentPageByStore() {
    this.store
      .getCurrentPage()
      .subscribe({ next: (data) => (this.currentPage = data) });
  }

  toggleItem(id: number) {
    const character = this.pageResults.find((item) => item.id === id);
    character.isFavorite = !character.isFavorite;
    // this.store.getPageInfo().subscribe((next) => (this.pageInfo = next));
    this.service.toggleFavorite({ character: { ...character } });
  }

  // onToggle(event: any) {
  //   this.store.getCharacterSchemaPage().subscribe((next) => (this.info = next));
  //   this.service.toggleFavorite(event, this.info);
  // }

  onResultList(event: any) {
    this.searchText = event.text;
    this.nextPage = 1;
    const { results, info } = event.schema;
        this.pageInfo = info;
        this.pageResults = results;

        this.pageTotalItems = info.count;
        this.currentPage = this.nextPage;
  }

  onReset() {
    this.searchText = '';
    this.nextPage = 1;
    this.getAllByService();
    }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
