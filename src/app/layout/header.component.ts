import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div>
      <span>19.04.2023</span>
      <span>Dev.js Summit</span>
    </div>
  `,
  styles: [
    `:host { background-color: lightblue; height: 75px }`
  ]
})
export class HeaderComponent {}
