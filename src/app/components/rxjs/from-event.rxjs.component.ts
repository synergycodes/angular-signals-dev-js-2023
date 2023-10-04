import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LogService } from '../../services/log.service';

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
  private readonly logService = inject(LogService);

  @ViewChild('clickMe', { static: true })
  clickMe: ElementRef | undefined;

  clicksCount$: Observable<number> = this.clicksCountSubject$.asObservable();

  ngAfterViewInit() {
    fromEvent(this.clickMe!.nativeElement, 'click')
      .pipe(
        map(() => 'Clicked!'),
        tap(() => this.clicksCountSubject$.next(this.clicksCountSubject$.value + 1)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(msg => this.logService.log(msg));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
