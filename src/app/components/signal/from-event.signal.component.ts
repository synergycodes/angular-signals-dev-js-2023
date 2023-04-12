import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  // signals: true, (not available yet)
  template: `
    <div #clickMe class="click-me" (click)="onClick()">Click me! (Signal)</div>
    <div>Number of clicks: {{ clicksCount() }}</div>
  `,
  styles: [
    `div {width: 200px; text-align: center; }`,
    `.click-me { height: 200px; background-color: lightseagreen; line-height: 200px; }`
  ]
})
export class FromEventSignalComponent {
  clicksCount: WritableSignal<number> = signal<number>(0);

  onClick() {
    console.log('Clicked');
    this.clicksCount.update(count => count + 1);
  }
}
