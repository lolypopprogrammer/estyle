import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothesBuilderService {
  selectedSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get selected$(): Observable<any> {
    return this.selectedSubject$;
  }

  constructor() { }

  setSelected(selected: any): void {
    this.selectedSubject$.next(selected);
  }
}
