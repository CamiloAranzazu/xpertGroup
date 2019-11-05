import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="main">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .main {
        transition: 369ms ease-in-out;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class AppComponent {
}
