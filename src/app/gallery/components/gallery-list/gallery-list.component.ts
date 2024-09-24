import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Character } from '../../models/character';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss'],
})
export class GalleryListComponent {
  @Input()
  list: Character[];

  @Output()
  toggleItem = new EventEmitter<any>();

  onToggle(id: number) {
    const character = this.list.find((item) => item.id === id);
    character.isFavorite = !character.isFavorite;

    this.toggleItem.emit({
      character: { ...character },
    });
  }
}
