import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '../../service/gallery.store';

@Component({
  selector: 'app-gallery-header',
  templateUrl: './gallery-header.component.html',
  styleUrls: ['./gallery-header.component.scss'],
})
export class GalleryHeaderComponent implements OnInit {

  constructor(private store: Store, private router: Router){}

  isBtnBeginPressed: boolean;
  isBtnFavoritePressed: boolean;
  favoriteCounter: number = 0;

  ngOnInit(): void {
    this.isBtnBeginPressed = true;
    this.isBtnFavoritePressed = false;
    this.store.getFavoriteCounter().subscribe(next => this.favoriteCounter = next);
  }

  onClick () {
    this.isBtnBeginPressed = !this.isBtnBeginPressed;
    this.isBtnFavoritePressed = !this.isBtnFavoritePressed;
    this.getFavoriteView();
  }

  getFavoriteView() {
    if (!this.isBtnFavoritePressed) return;
    if(this.favoriteCounter === 0){
      this.router.navigate(['favoritos-vazio']);
    } else {
      this.router.navigate(['favoritos']);
    }
  }
}
