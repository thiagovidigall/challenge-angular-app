import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  GalleryFavoriteComponent,
} from './gallery-favorite/gallery-favorite.component';
import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
import { GalleryAppComponent } from './gallery.app.component';

const routes: Routes = [
  { path: '', component: GalleryAppComponent,
    children: [
      { path: '', component: GalleryHomeComponent },
      { path: 'favorite', component: GalleryFavoriteComponent }
    ]
   },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class GalleryRoutingModule { }
