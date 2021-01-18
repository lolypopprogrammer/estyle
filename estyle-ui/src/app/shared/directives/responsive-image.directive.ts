import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {BreakpointObserverService} from "../services/breakpoint-observer.service";
import {delay, filter, map, switchMap, takeUntil, takeWhile, tap} from "rxjs/operators";
import { interval } from 'rxjs';

@Directive({
  selector: '[appResponsiveImage]'
})
export class ResponsiveImageDirective implements OnInit, OnDestroy {
  sizeOptionsSubject$ = new BehaviorSubject(null);
  sizeOptions$ = this.sizeOptionsSubject$.asObservable();
  size$ = this.breakpointObserverService.size$;
  currentSrcSubject$ = new BehaviorSubject(null);
  currentSrc$ = this.currentSrcSubject$.asObservable();

  currentSrc: string;

  private readonly unsubscribe$ = new Subject<void>();

  @Input() set sizeOptions(options) {
    this.sizeOptionsSubject$.next(options);
  };

  constructor(
    private breakpointObserverService: BreakpointObserverService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    const timer$ = interval(100);

    timer$.pipe(
      takeWhile(() => !this.currentSrc),
      tap(() => {
        this.currentSrc = this.el.nativeElement.currentSrc;
        this.currentSrcSubject$.next(this.currentSrc);
      })
    ).subscribe();

    combineLatest([
      this.currentSrc$.pipe(filter(currentSrc => !!currentSrc)),
      this.size$
    ])
      .pipe(
        switchMap(([currentSrc, size]) =>
          this.sizeOptions$.pipe(
            filter(sizeOptions => !!sizeOptions),
            map(sizeOptions => sizeOptions[size] || currentSrc),
          )
        ),
        filter(image => !!image),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(image =>
        this.renderer.setAttribute(this.el.nativeElement, 'src', image || this.currentSrc)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
