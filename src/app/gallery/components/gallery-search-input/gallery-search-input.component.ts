import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';

import { Character } from '../../models/character';
import { FilterPipe } from '../../pipes/filter.pipe';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'app-gallery-search-input',
  templateUrl: './gallery-search-input.component.html',
  styleUrls: ['./gallery-search-input.component.scss'],
  providers: [FilterPipe],
})
export class GallerySearchInputComponent {
  query = new FormControl();

  constructor(private service: GalleryService, private filter: FilterPipe) {}

  ngOnInit() {
    this.query.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length >= 3),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((value) => this.service.getAllCharacters(`?name=${value}`)),
        map((res: any) => res)
      )
      .subscribe((res) => this.updateResultList(res));
  }

  @Input()
  list: Character[];

  @Output()
  resultList = new EventEmitter<any>();

  @Output()
  reset = new EventEmitter<any>();

  updateResultList(schema: any) {
    this.resultList.emit({ schema: schema, text: this.query.value });
  }

  keyUp(event: any) {
    const text = event.target.value;
    if (text.length > 0) return;
    this.reset.emit();
  }
}
