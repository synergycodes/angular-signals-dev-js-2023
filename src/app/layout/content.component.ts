import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <router-outlet></router-outlet>
    <div>LOG</div>
  `,
  styleUrls: ['./content.component.css']
})
export class ContentComponent {}
