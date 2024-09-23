import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { Character, CharacterSchema, Page } from '../models/character';
import { Store } from './gallery.store';

@Injectable()
export class GalleryService {
  constructor(private http: HttpClient, private store: Store) {}

  protected UrlServiceV1: string = 'https://rickandmortyapi.com/api/character/';

  // getCharacterSchema$: Observable<CharacterSchema> = this.http
  //   .get<CharacterSchema>(this.UrlServiceV1)
  //   .pipe(
  //     map((schema) => {
  //       schema.results = schema.results.map((character) => {
  //         const characterDto: Character = { ...character };
  //         characterDto.isFavorite = false;
  //         return characterDto;
  //       });
  //       return schema;
  //     }),
  //     tap((next) => this.store.set('characterschema', next))
  //   );

  getAllCharacters(page: number): Observable<CharacterSchema> {    
    return this.http.get<CharacterSchema>(this.UrlServiceV1 + '?page=' + page)
    .pipe(
      map((schema) => {
        schema.results = schema.results.map((character) => {

          const characterDto: Character = { ...character };
          characterDto.isFavorite = this.getIsFavorite(character);
          return characterDto;
        });
        
        return schema;
      }),
      tap((next) => this.store.set('characterslist', next.results)),
      tap((next) => this.store.set('pageinfo', next.info)),
      tap(() => this.store.set('currentpage', page))
    );
  }

  getIsFavorite(character: Character): boolean {
    const favorites = this.store.value.favoritelist;
    const favorite = favorites.find( (char) => char.id === character.id);
    if (favorite) return true;
    return false;
  }

  toggleFavorite(event: any) {
    const characterList = this.store.value.characterslist.map((item: Character) => {
      if (event.character.id === item.id) {
        return { ...item, ...event.character };
      }
      return item;
    });
    this.store.set('characterslist', characterList);

    let newFavoriteList =  this.store.value.favoritelist;
    if (event.character.isFavorite) {
      newFavoriteList.push(event.character);
    } else {
      newFavoriteList = newFavoriteList.filter((item) => item.id != event.character.id);
    }
    this.store.set('favoritelist', newFavoriteList)
    
    // let currentPage = this.store.value.currentpage;
    // currentPage = pageNumber;
    // this.store.set('currentpage', currentPage)
  }
}
