import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="content">
      <div class="">
        <app-header></app-header>
      </div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>  
  </div>
    
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: wrap;
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
