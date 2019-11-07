import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="content">
      <div class="header">
        <app-header></app-header>
      </div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>  
  </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
