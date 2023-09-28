import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../../services/log.service';

@Component({
  template: `
    <div (click)="fetchData()" class="click-me">Refresh data</div>
    <div>Number of characters: {{ charactersCount() }}</div>
  `,
  styles: [
    `div {width: 200px; text-align: center; }`,
    `.click-me { height: 200px; background-color: lightseagreen; line-height: 200px; }`
  ]
})
export class HttpSignalComponent {
  private readonly logService = inject(LogService);
  charactersCount: WritableSignal<string> = signal<string>('0');
  characters: WritableSignal<any[]> = signal<any[]>([]);

  constructor(private readonly httpClient: HttpClient) {
    effect(() => this.logService.log(this.characters()));
  }

  fetchData() {
    this.charactersCount.set('Loading...');
    this.httpClient.get('https://rickandmortyapi.com/api/character')
      .subscribe(({ results }: any) => {
        this.charactersCount.set(results.length.toString());
        this.characters.set(results);
      });
  }
}
