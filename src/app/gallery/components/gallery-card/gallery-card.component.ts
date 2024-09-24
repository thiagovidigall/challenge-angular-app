import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Character } from '../../models/character';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
})
export class GalleryCardComponent {
  @Input()
  character: Character;

  @Output()
  toggle = new EventEmitter<any>();

  onToggleId(id: number) {
    // const character = this.list.find((item) => item.id === id);
    // this.character.isFavorite = !this.character.isFavorite;

    this.toggle.emit(id);
  }
}
