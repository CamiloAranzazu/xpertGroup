import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './pages/files/files.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing-module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilesComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
