import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../models/character';
import { map } from 'rxjs';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-gallery-search-input',
  templateUrl: './gallery-search-input.component.html',
  styleUrls: ['./gallery-search-input.component.css'],
  providers: [FilterPipe],
})
export class GallerySearchInputComponent {

  constructor(private filter: FilterPipe) {}

  @Input()
  list: Character[];

  @Output()
  resultList = new EventEmitter<any>();

  keyUp(event: any) {
    const text = event.target.value;
    const newList = this.filter.transform(this.list, text);
    this.resultList.emit({newList: newList});
  }
}
