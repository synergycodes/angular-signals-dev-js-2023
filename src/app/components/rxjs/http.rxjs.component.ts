import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, fromEvent, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { LogService } from '../../services/log.service';

@Component({
  template: `
    <div #clickMe class="click-me">Refresh data</div>
    <div>Number of characters: {{ charactersCount }}</div>
  `,
  styles: [
    `div {width: 200px; text-align: center; }`,
    `.click-me { height: 200px; background-color: lightsalmon; line-height: 200px; }`
  ]
})
export class HttpRxjsComponent implements AfterViewInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private charactersSubject$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private loading = false;
  private readonly logService = inject(LogService);

  @ViewChild('clickMe', { static: true })
  clickMe: ElementRef | undefined;

  get charactersCount(): string {
    return this.loading ? 'Loading...' : this.charactersSubject$.value.length.toString();
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  ngAfterViewInit() {
    fromEvent(this.clickMe!.nativeElement, 'click')
      .pipe(
        tap(() => this.loading = true),
        switchMap(() => this.httpClient.get('https://rickandmortyapi.com/api/character')),
        map((response: any) => response.results),
        tap(characters => this.charactersSubject$.next(characters)),
        tap(() => this.loading = false),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(msg => this.logService.log(msg));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
