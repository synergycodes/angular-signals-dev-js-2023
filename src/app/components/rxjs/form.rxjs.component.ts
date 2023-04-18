import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <input [formControl]="email" type="email" placeholder="email"/>
    <input [formControl]="password" type="password" placeholder="password"/>
    <input [formControl]="repeatPassword" type="password" placeholder="repeat password"/>
    <div>Password match: <span>{{ passwordMatch | async }}</span></div>
  `,
  styles: [
    `:host { display: flex; flex-direction: column; margin: 20px; gap: 10px; width: 200px; }`,
    `:host input { margin: 0 20px; }`,
    `div { text-align: center; width: 200px }`
  ]
})
export class FormRxjsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  email = new FormControl<string>('');
  password = new FormControl<string>('');
  repeatPassword = new FormControl<string>('');
  passwordMatch: Observable<boolean> = combineLatest([
    this.password.valueChanges,
    this.repeatPassword.valueChanges
  ]).pipe(
    map(([pass1, pass2]) => pass1 === pass2),
    startWith(false),
  );

  ngOnInit() {
    this.password.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      filter(() => !!this.repeatPassword.value),
      tap(() => this.repeatPassword.setValue('')),
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
