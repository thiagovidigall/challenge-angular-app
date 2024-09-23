import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Character[], searchText: string): Character[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText.length <= 0) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
