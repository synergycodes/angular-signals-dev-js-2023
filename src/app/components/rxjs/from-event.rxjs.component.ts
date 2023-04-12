import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, map, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  template: `
    <div #clickMe class="click-me">Click me! (RxJS)</div>
    <div>Number of clicks: {{ clicksCount$ | async }}</div>
  `,
  styles: [
    `div {width: 200px; text-align: center; }`,
    `.click-me { height: 200px; background-color: lightsalmon; line-height: 200px; }`
  ]
})
export class FromEventRxjsComponent implements AfterViewInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private clicksCountSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @ViewChild('clickMe', { static: true })
  clickMe: ElementRef | undefined;

  clicksCount$: Observable<number> = this.clicksCountSubject$.asObservable();

  ngAfterViewInit() {
    fromEvent(this.clickMe!.nativeElement, 'click')
      .pipe(
        takeUntil(this.unsubscribe$),
        map(() => 'Clicked!'),
        tap(() => this.clicksCountSubject$.next(this.clicksCountSubject$.value + 1))
      )
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
