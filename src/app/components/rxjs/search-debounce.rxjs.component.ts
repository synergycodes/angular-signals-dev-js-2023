import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  template: `
    <input (input)="handleInput($event)" type="text" placeholder="Search term..."/>
    <div>List of characters: <span *ngIf="loading">Loading...</span></div>

    <div *ngFor="let character of characters$ | async">
      {{ character.name }}
    </div>
  `,
  styles: [
    `input { margin: 20px; }`,
    `div { width: 200px; text-align: center; }`
  ]
})
export class SearchDebounceRxjsComponent {
  private searchTermSubject$: Subject<string> = new Subject<string>();
  loading = false;

  characters$ = this.searchTermSubject$
    .asObservable()
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap((searchTerm: string) =>
        this.httpClient.get(`https://rickandmortyapi.com/api/character?name=${searchTerm}`)
          .pipe(
            map((response: any) => response.results),
            catchError(() => of([]))
          )
      ),
      tap(() => this.loading = false),
    );

  constructor(private readonly httpClient: HttpClient) {
  }

  handleInput(event: any) {
    this.searchTermSubject$.next(event.target.value);
  }
}
