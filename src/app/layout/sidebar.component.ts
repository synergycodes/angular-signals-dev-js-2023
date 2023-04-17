import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div>
      <div class="navigation">
        <a [routerLink]="['/from-event/rxjs']">From Event RxJS</a>
        <a [routerLink]="['/http/rxjs']">Http Request RxJS</a>
        <a [routerLink]="['/search-debounce/rxjs']">Search Debounce RxJS</a>
        <a [routerLink]="['/from-event/signal']">From Event Signal</a>
        <a [routerLink]="['/http/signal']">Http Request Signal</a>
        <a [routerLink]="['/search-debounce/signal']">Search Debounce Signal</a>
      </div>
    </div>
  `,
  styles: [
    `:host { background-color: red; width: 300px; height: 100%; }`,
    `.navigation { display: flex; flex-direction: column; }`
  ]
})
export class SidebarComponent {}
