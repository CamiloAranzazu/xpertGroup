import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './pages/start/start.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing-module';

@NgModule({
  declarations: [StartComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
