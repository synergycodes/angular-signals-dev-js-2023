import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
    `:host { background-color: lightslategrey; flex: auto; min-height: 100px; }`
  ]
})
export class ContentComponent {}
