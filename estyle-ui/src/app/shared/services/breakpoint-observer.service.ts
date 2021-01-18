import {Injectable, Query} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {distinctUntilChanged, map, shareReplay, startWith} from "rxjs/operators";

const QUERY: Map<string, string> = new Map([
  ['xl', '(min-width: 1200px)'],
  ['lg', '(min-width: 992px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 576px)'],
  ['xs', '(min-width: 0px)'],
]);

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {
  size$: Observable<string>;

  constructor() {
    this.size$ = fromEvent(window, 'resize')
      .pipe(
        startWith(this.getScreenSize()),
        map((event: Event) => this.getScreenSize()),
        distinctUntilChanged(),
        shareReplay(1)
      );
  }

  private getScreenSize(): string {
    const [[newSize = 'never']] = Array.from(QUERY.entries())
      .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    return newSize;
  }
}
