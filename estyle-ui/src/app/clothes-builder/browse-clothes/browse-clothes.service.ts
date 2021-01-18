import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IClothe } from './browse-clothes.component';

@Injectable({
  providedIn: 'root'
})
export class BrowseClothesService {
  selectedSubject$: BehaviorSubject<IClothe> = new BehaviorSubject(null);

  get selected$(): Observable<IClothe> {
    return this.selectedSubject$.asObservable();
  }

  constructor() { }

  select(clothe: IClothe): void {
    this.selectedSubject$.next(clothe);
  }

  unselect(): void {
    this.selectedSubject$.next(null);
  }
}
