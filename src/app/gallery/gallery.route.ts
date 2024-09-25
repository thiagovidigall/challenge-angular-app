import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  GalleryFavoriteEmptyComponent,
} from './gallery-favorite-empty/gallery-favorite-empty.component';
import {
  GalleryFavoriteComponent,
} from './gallery-favorite/gallery-favorite.component';
import {
  GalleryHomeEmptyComponent,
} from './gallery-home-empty/gallery-home-empty.component';
import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
import { GalleryAppComponent } from './gallery.app.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryAppComponent,
    children: [
      { path: '', component: GalleryHomeComponent },
      { path: 'home-vazio', component: GalleryHomeEmptyComponent },
      { path: 'favoritos', component: GalleryFavoriteComponent },
      { path: 'favoritos-vazio', component: GalleryFavoriteEmptyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
