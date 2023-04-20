import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="logo">
      <img src="../../assets/logo.png" />
    </div>
    <div class="navigation">
      <a [routerLink]="['/from-event/rxjs']">From Event RxJS</a>
      <a [routerLink]="['/http/rxjs']">Http Request RxJS</a>
      <a [routerLink]="['/search-debounce/rxjs']">Search Debounce RxJS</a>
      <a [routerLink]="['/exchange-rates/rxjs']">Exchange Rates RxJS</a>
      <a [routerLink]="['/form/rxjs']">Form RxJS</a>
      <a [routerLink]="['/from-event/signal']">From Event Signal</a>
      <a [routerLink]="['/http/signal']">Http Request Signal</a>
      <a [routerLink]="['/search-debounce/signal']">Search Debounce Signal</a>
      <a [routerLink]="['/exchange-rates/signal']">Exchange Rates Signal</a>
      <a [routerLink]="['/form/signal']">Form Signal</a>
    </div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {}
