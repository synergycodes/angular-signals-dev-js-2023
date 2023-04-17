import { Component, effect, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Component({
  template: `
    <input (input)="handleInput($event)" type="text" placeholder="Search term..."/>
    <div>List of characters: <span *ngIf="loading()">Loading...</span></div>

    <div *ngFor="let character of characters()">
      {{ character.name }}
    </div>
  `,
  styles: [
    `input { margin: 20px; }`,
    `div { width: 200px; text-align: center; }`
  ]
})
export class SearchDebounceSignalComponent {
  searchTerm: WritableSignal<string> = signal<string>('');
  loading: WritableSignal<boolean> = signal<boolean>(false);
  characters: WritableSignal<any[]> = signal<any[]>([]);

  constructor(private readonly httpClient: HttpClient) {
    effect(() => {
      this.loading.set(true);
      this.httpClient.get(`https://rickandmortyapi.com/api/character?name=${this.searchTerm()}`)
        .pipe(
          map((response: any) => response.results),
          catchError(() => of([]))
        )
        .subscribe(characters => {
          this.loading.set(false);
          this.characters.set(characters);
        });
    }, { allowSignalWrites: true });
  }

  handleInput(event: any) {
    this.searchTerm.set(event.target.value);
  }
}
