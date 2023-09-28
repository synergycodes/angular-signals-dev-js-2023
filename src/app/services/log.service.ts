import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  messages: string[] = [];

  constructor(private readonly router: Router) {
    router.events.pipe(
      takeUntil(this.unsubscribe$),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.messages = [];
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  log(msg: any) {
    console.log(msg);
    this.messages.push(msg);
  }
}
