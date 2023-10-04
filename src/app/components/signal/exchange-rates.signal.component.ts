import { Component, computed, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  template: `
    <input (input)="handleInput($event)" type="text" placeholder="PLN"/><span>PLN</span>
    <div>USD: {{ usd() | currency }} </div>
  `,
  styles: [
    `input { margin: 20px; }`,
    `div { width: 200px; text-align: center; }`
  ]
})
export class ExchangeRatesSignalComponent implements OnInit, OnDestroy {
  private interval: ReturnType<typeof setInterval> | undefined;
  private pln: WritableSignal<number> = signal<number>(0);
  private rate: WritableSignal<number> = signal<number>(4.41);

  usd: Signal<number> = computed<number>(() => this.pln() * this.rate());

  ngOnInit() {
    this.interval = setInterval(() => {
      this.rate.update((currentRate: number) => currentRate + (Math.random() * 0.1 - 0.05));
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  handleInput(event: any) {
    this.pln.set(event.target.value);
  }
}
