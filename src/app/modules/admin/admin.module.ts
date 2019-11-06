import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './pages/files/files.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing-module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [FilesComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
