import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './pages/files/files.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing-module';

@NgModule({
  declarations: [FilesComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
