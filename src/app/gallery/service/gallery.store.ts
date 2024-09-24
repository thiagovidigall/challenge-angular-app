import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Character,
  Page,
} from '../models/character';

export interface State {
  pageinfo: Page;
  characterslist: Character[];
  currentpage: number;
  favoritelist: Character[];
}

const state: State = {
  pageinfo: {} as Page,
  characterslist: [],
  currentpage: 0,
  favoritelist: [],
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  public getPageInfo(): Observable<Page> {
    return this.store.pipe(map((store) => store.pageinfo));
  }

  public getCharacterList(): Observable<Character[]> {
    return this.store.pipe(map((store) => store.characterslist));
  }

  public getCurrentPage(): Observable<number> {
    return this.store.pipe(map((store) => store.currentpage));
  }

  public getFavoriteList(): Observable<Character[]> {
    return this.store.pipe(map((store) => store.favoritelist));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
