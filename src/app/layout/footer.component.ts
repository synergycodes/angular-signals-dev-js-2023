import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div>FOOTER</div>
  `,
  styles: [
    `:host { background-color: yellow; height: 50px }`
  ]
})
export class FooterComponent {}
