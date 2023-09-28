import { Component } from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-content',
  template: `
    <router-outlet></router-outlet>
    <div *ngIf="logService.messages.length > 0" class="log-container">
      <h3>LOG:</h3>
      <div *ngFor="let message of logService.messages">{{ message | json }}</div>
    </div>
  `,
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  constructor(public readonly logService: LogService) {
  }
}
