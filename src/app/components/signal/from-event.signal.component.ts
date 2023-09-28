import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  // signals: true, (not available yet)
  template: `
    <div class="click-me" (click)="onClick()">Click me! (Signal)</div>
    <div>Number of clicks: {{ clicksCount() }}</div>
  `,
  styles: [
    `div {width: 200px; text-align: center; }`,
    `.click-me { height: 200px; background-color: lightseagreen; line-height: 200px; }`
  ]
})
export class FromEventSignalComponent {
  private readonly logService = inject(LogService);
  clicksCount: WritableSignal<number> = signal<number>(0);

  onClick() {
    this.logService.log('Clicked');
    this.clicksCount.update(count => count + 1);
  }
}
