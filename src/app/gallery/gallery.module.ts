import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import {
  GalleryCardComponent,
} from './components/gallery-card/gallery-card.component';
import {
  GalleryHeaderComponent,
} from './components/gallery-header/gallery-header.component';
import {
  GalleryListComponent,
} from './components/gallery-list/gallery-list.component';
import {
  GallerySearchInputComponent,
} from './components/gallery-search-input/gallery-search-input.component';
import {
  GalleryFavoriteComponent,
} from './gallery-favorite/gallery-favorite.component';
import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
import { GalleryAppComponent } from './gallery.app.component';
import { GalleryRoutingModule } from './gallery.route';
import { FilterPipe } from './pipes/filter.pipe';
import { GalleryService } from './service/gallery.service';
import { Store } from './service/gallery.store';

@NgModule({
  declarations: [
    GalleryAppComponent,
    GalleryHomeComponent,
    GalleryListComponent,
    GalleryFavoriteComponent,
    GalleryCardComponent,
    GalleryHeaderComponent,
    FilterPipe,
    GallerySearchInputComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [GalleryService, Store],
})
export class GalleryModule {}
