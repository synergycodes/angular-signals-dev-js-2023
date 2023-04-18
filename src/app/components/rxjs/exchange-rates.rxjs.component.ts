import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, interval, map, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  template: `
    <input (input)="handleInput($event)" type="text" placeholder="PLN"/><span>PLN</span>
    <div>USD: {{ usd$ | async | currency }} </div>
  `,
  styles: [
    `input { margin: 20px; }`,
    `div { width: 200px; text-align: center; }`
  ]
})
export class ExchangeRatesRxjsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private interval$: Observable<number> = interval(1000).pipe(
    takeUntil(this.unsubscribe$),
    tap(() => {
      this.rateSubject$.next(this.rateSubject$.value + (Math.random() * 0.1 - 0.05));
    })
  );
  private plnSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private rateSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(4.22);

  usd$: Observable<number> = combineLatest([
    this.plnSubject$.asObservable(),
    this.rateSubject$,
  ]).pipe(map(([pln, usd]) => pln * usd));

  ngOnInit() {
    this.interval$.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleInput(event: any) {
    this.plnSubject$.next(event.target.value);
  }
}
