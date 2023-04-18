import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  template: `
    <input [value]="email()" (input)="setEmail($event)" type="email" placeholder="email"/>
    <input [value]="password()" (input)="setPassword($event)" type="password" placeholder="password"/>
    <input [value]="repeatPassword()" (input)="setRepeatPassword($event)" type="password" placeholder="repeat password" />
    <div>Password match: <span>{{ passwordMatch() }}</span></div>
  `,
  styles: [
    `:host { display: flex; flex-direction: column; margin: 20px; gap: 10px; width: 200px; }`,
    `:host input { margin: 0 20px; }`,
    `div { text-align: center; width: 200px }`
  ]
})
export class FormSignalComponent {
  email: WritableSignal<string> = signal<string>('');
  password: WritableSignal<string> = signal<string>('');
  repeatPassword: WritableSignal<string> = signal<string>('');
  passwordMatch: Signal<boolean> = computed(() =>
    this.password() === this.repeatPassword()
  );

  constructor() {
    effect(() => {
      this.password();
      this.repeatPassword.set('');
    }, { allowSignalWrites: true });
  }

  setEmail(event: any) {
    this.email.set(event.target.value);
  }

  setPassword(event: any) {
    this.password.set(event.target.value);
  }

  setRepeatPassword(event: any) {
    this.repeatPassword.set(event.target.value);
  }
}
